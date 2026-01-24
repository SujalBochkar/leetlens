import 'dotenv/config';
import axios from 'axios';

const GITHUB_CONFIG = {
	owner: process.env.GITHUB_REPO_OWNER!,
	repo: process.env.GITHUB_REPO_NAME!,
	token: process.env.GITHUB_TOKEN!,
	baseURL: process.env.GITHUB_BASE_URL!,
};

const github = axios.create({
	baseURL: GITHUB_CONFIG.baseURL,
	headers: {
		Authorization: `token ${GITHUB_CONFIG.token}`,
		Accept: 'application/vnd.github.v3+json',
	},
});

async function fetchCSV(path: string): Promise<string> {
	const res = await github.get(
		`/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${path}`,
	);

	return Buffer.from(res.data.content, 'base64').toString('utf8');
}

export async function getAllCompanyFolders(): Promise<string[]> {
	const res = await github.get(`/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents`);
	return res.data
		.filter((i: any) => i.type === 'dir' && !i.name.startsWith('.'))
		.map((i: any) => i.name);
}

export async function getCompanyData(company: string): Promise<Record<string, string>> {
	const url = `/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${encodeURIComponent(
		company,
	)}`;
	const res = await github.get(url);

	const csvFiles = res.data.filter(
		(i: any) => i.type === 'file' && i.name.toLowerCase().endsWith('.csv'),
	);

	const data: Record<string, string> = {};

	for (const file of csvFiles) {
		const content = await fetchCSV(file.path);
		data[file.path] = content;
	}

	return data;
}
