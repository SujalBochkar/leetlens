import 'dotenv/config';
import { parse } from 'csv-parse/sync';
import * as path from 'path';
import { saveMergedProblems } from './database';
import type { MergedRow, ProblemRow } from './types';
import { getAllCompanyFolders, getCompanyData } from './request';

// Weights for 5 windows
const WEIGHTS: Record<string, number> = {
	'30 Days': 0.35,
	'3 Months': 0.25,
	'6 Months': 0.2,
	'More Than 6 Months': 0.1,
	All: 0.1,
};

function parseCSV(content: string): ProblemRow[] {
	return parse(content, {
		columns: true,
		skip_empty_lines: true,
	}) as ProblemRow[];
}

async function main() {
	console.log('Fetching all company folders...');
	const companies = await getAllCompanyFolders();
	console.log(`Found ${companies.length} companies:`, companies);

	for (const company of companies) {
		console.log(`\nProcessing ${company}...`);

		// 1) Fetch all CSV data for this company
		const companyData = await getCompanyData(company);
		const data: Record<string, Record<string, ProblemRow & { frequencyNum: number }>> = {};

		// 2) Parse and aggregate data
		for (const [filePath, csvText] of Object.entries(companyData)) {
			const name = path.basename(filePath, '.csv'); // e.g., "30 Days"
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

			// Compute weighted priority
			let priority = 0;
			for (const [windowName, weight] of Object.entries(WEIGHTS)) {
				// Match generic window names like "Thirty Days" to "30 Days" if needed,
				// or assume CSV names match keys.
				// The previous code assumed direct mapping.
				// Let's rely on the CSV filenames being close enough or map them if needed.
				// For now, we assume the CSV filenames (e.g. "1. Thirty Days") handled by `name` match logic?
				// Actually, the previous code used `path.basename` which includes numbers "1. Thirty Days".
				// We might need to map "1. Thirty Days" -> "30 Days".

				// Let's stick to the simple check for now:
				// If the window name *contains* the key
				const matchingWindowKey = Object.keys(windows).find((k) =>
					k.toLowerCase().includes(windowName.toLowerCase().replace(' ', '')),
				);

				if (matchingWindowKey && windows[matchingWindowKey]) {
					priority += windows[matchingWindowKey].frequencyNum * weight;
				}
			}

			mergedRows.push({
				Difficulty: base.Difficulty,
				Title: title,
				AcceptanceRate: base.AcceptanceRate || (base as any).AcceptanceRate || '',
				Link: base.Link,
				Topics: base.Topics,
				PriorityScore: priority.toFixed(2),
				...Object.fromEntries(Object.entries(windows).map(([k, v]) => [k, v.frequencyNum])),
			});
		}

		// 4) Sort by priority DESC
		mergedRows.sort((a, b) => parseFloat(b.PriorityScore) - parseFloat(a.PriorityScore));

		// 5) Save to Database
		if (mergedRows.length > 0) {
			await saveMergedProblems(mergedRows, decodeURIComponent(company));
		} else {
			console.log(`No data found for ${company}`);
		}
	}
}

main().catch(console.error);
