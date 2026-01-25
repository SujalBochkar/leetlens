import 'dotenv/config';
import axios from 'axios';
import { parse } from 'csv-parse/sync';

export const REPO_OWNER = process.env.GITHUB_REPO_OWNER;
export const REPO_NAME = process.env.GITHUB_REPO_NAME;

const github = axios.create({
	baseURL: process.env.GITHUB_BASE_URL || 'https://api.github.com',
	headers: {
		Authorization: `token ${process.env.GITHUB_TOKEN}`,
		Accept: 'application/vnd.github.v3+json',
	},
});

export type ParsedProblem = {
	titleSlug: string;
	title: string;
	frequency30Days: number;
	frequency3Months: number;
	frequency6Months: number;
	frequencyAllTime: number;
	priorityScore: number;
};

// Frequency field keys only
type FrequencyField =
	| 'frequency30Days'
	| 'frequency3Months'
	| 'frequency6Months'
	| 'frequencyAllTime';

// File name to frequency field mapping
const FILE_MAP: Record<string, FrequencyField> = {
	'thirty-days.csv': 'frequency30Days',
	'three-months.csv': 'frequency3Months',
	'six-months.csv': 'frequency6Months',
	'all.csv': 'frequencyAllTime',
};

// Get all company folders from repo
export async function getRepoFolders(): Promise<string[]> {
	const res = await github.get(`/repos/${REPO_OWNER}/${REPO_NAME}/contents`);
	return res.data
		.filter((item: any) => item.type === 'dir' && !item.name.startsWith('.'))
		.map((item: any) => item.name);
}

// Get CSV files from a company folder
async function getFolderFiles(folder: string): Promise<{ name: string; path: string }[]> {
	const res = await github.get(
		`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${encodeURIComponent(folder)}`,
	);
	return res.data
		.filter((item: any) => item.type === 'file' && item.name.endsWith('.csv'))
		.map((item: any) => ({ name: item.name, path: item.path }));
}

// Fetch and decode CSV content
async function fetchCSVContent(path: string): Promise<string> {
	const res = await github.get(`/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`);
	return Buffer.from(res.data.content, 'base64').toString('utf-8');
}

// Extract titleSlug from LeetCode URL
function extractTitleSlug(url: string): string {
	const match = url.match(/problems\/([^/]+)/);
	return match ? match[1] : '';
}

// Process a company folder and return parsed problems with frequencies
export async function processCompanyFolder(companyFolder: string): Promise<ParsedProblem[]> {
	const files = await getFolderFiles(companyFolder);
	if (files.length === 0) return [];

	const problemData = new Map<string, ParsedProblem>();

	for (const file of files) {
		const field = FILE_MAP[file.name];
		if (!field) {
			// Skip unknown files (like more-than-six-months.csv)
			continue;
		}

		const content = await fetchCSVContent(file.path);
		const rows = parse(content, { columns: true, skip_empty_lines: true }) as Record<
			string,
			string
		>[];

		for (const row of rows) {
			const titleSlug = extractTitleSlug(row.URL || '');
			if (!titleSlug) continue;

			let problem = problemData.get(titleSlug);
			if (!problem) {
				problem = {
					titleSlug,
					title: row.Title || '',
					frequency30Days: 0,
					frequency3Months: 0,
					frequency6Months: 0,
					frequencyAllTime: 0,
					priorityScore: 0,
				};
				problemData.set(titleSlug, problem);
			}

			// Parse "87.5%" -> 87.5
			const freqStr = (row['Frequency %'] || '0').replace('%', '');
			problem[field] = parseFloat(freqStr) || 0;
		}
	}

	// Calculate priority score (weighted sum)
	for (const problem of problemData.values()) {
		problem.priorityScore =
			problem.frequency30Days * 0.35 +
			problem.frequency3Months * 0.25 +
			problem.frequency6Months * 0.2 +
			problem.frequencyAllTime * 0.2;
	}

	return Array.from(problemData.values()).sort((a, b) => b.priorityScore - a.priorityScore);
}
