import axios from 'axios';

const GITHUB_CONFIG = {
	owner: 'liquidslr',
	repo: 'leetcode-company-wise-problems',
	token: process.env.GITHUB_TOKEN,
	baseURL: 'https://api.github.com',
} as const;

// Helper: GitHub API client
const github = axios.create({
	baseURL: GITHUB_CONFIG.baseURL,
	headers: {
		Authorization: `token ${GITHUB_CONFIG.token}`,
		Accept: 'application/vnd.github.v3+json',
	},
});

export async function fetchFolderFiles(folderPath: string): Promise<string[]> {
	const url = `/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${folderPath}`;
	const response = await github.get(url);
	return response.data
		.filter((item: any) => item.name.endsWith('.csv'))
		.map((item: any) => item.path);
}

export async function fetchCSV(path: string): Promise<string> {
	const url = `/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${path}`;
	const response = await github.get(url);
	const contentBase64 = response.data.content;
	return Buffer.from(contentBase64, 'base64').toString('utf8');
}
