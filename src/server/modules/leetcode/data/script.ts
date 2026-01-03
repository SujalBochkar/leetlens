import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import * as fs from 'fs';
import * as path from 'path';
import { fetchCSV, fetchFolderFiles } from './request';
import type { MergedRow, ProblemRow } from './types';

// Weights for 5 windows
const WEIGHTS: Record<string, number> = {
	'30 Days': 0.35,
	'3 Months': 0.25,
	'6 Months': 0.2,
	'More Than 6 Months': 0.1,
	All: 0.1,
};

const FOLDER_PATH = 'American%20Express';

function parseCSV(content: string): ProblemRow[] {
	return parse(content, {
		columns: true,
		skip_empty_lines: true,
	}) as ProblemRow[];
}

async function main() {
	// 1) Get all CSV file paths
	console.log(`fetching files from ${FOLDER_PATH}...`);
	const files = await fetchFolderFiles(FOLDER_PATH);
	console.log('Found CSVs:', files);

	// 2) Parse each CSV
	const data: Record<string, Record<string, ProblemRow & { frequencyNum: number }>> = {};

	for (const filePath of files) {
		const name = path.basename(filePath, '.csv');
		const csvText = await fetchCSV(filePath);
		const rows = parseCSV(csvText);

		for (const row of rows) {
			const title = row.Title.trim();
			const freqNum = parseFloat(String(row.Frequency));

			if (!data[title]) {
				data[title] = {};
			}

			data[title][name] = {
				...row,
				frequencyNum: isNaN(freqNum) ? 0 : freqNum,
			};
		}
	}

	// 3) Merge into unified rows
	const mergedRows: MergedRow[] = [];

	for (const [title, windows] of Object.entries(data)) {
		const base = Object.values(windows)[0]; // just to pull static fields
		const difficulty = base.Difficulty;
		// Some CSVs might use "Acceptance Rate" or "AcceptanceRate"
		const acceptance = base.AcceptanceRate || (base as any).AcceptanceRate || '';
		const link = base.Link;
		const topics = base.Topics;

		// Compute weighted priority
		let priority = 0;
		for (const [windowName, weight] of Object.entries(WEIGHTS)) {
			if (windows[windowName]) {
				priority += windows[windowName].frequencyNum * weight;
			}
		}

		mergedRows.push({
			Difficulty: difficulty,
			Title: title,
			AcceptanceRate: acceptance,
			Link: link,
			Topics: topics,
			PriorityScore: priority.toFixed(2),
			...Object.fromEntries(Object.entries(windows).map(([k, v]) => [k, v.frequencyNum])),
		});
	}

	// 4) Sort by priority DESC
	mergedRows.sort((a, b) => parseFloat(b.PriorityScore) - parseFloat(a.PriorityScore));

	// 5) Output to CSV
	const csv = stringify(mergedRows, {
		header: true,
	});

	fs.writeFileSync('american_express_merged.csv', csv);
	console.log('Merged CSV written ➤ american_express_merged.csv');
}

main().catch(console.error);
