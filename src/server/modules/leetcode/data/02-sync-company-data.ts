import prisma from '@/server/db';
import {
	REPO_OWNER,
	REPO_NAME,
	getRepoFolders,
	processCompanyFolder,
	ParsedProblem,
} from './01-github-client';

// Get company IDs from database (keyed by slug for matching with GitHub folders)
async function getCompanyIds(): Promise<Map<string, string>> {
	const companies = await prisma.company.findMany({
		select: { id: true, slug: true },
	});

	const companyMap = new Map<string, string>();
	for (const company of companies) {
		companyMap.set(company.slug, company.id);
	}

	return companyMap;
}

// Convert to Title Case: "american-express" -> "American Express"
function toTitleCase(str: string): string {
	return str
		.replace(/[-_]/g, ' ') // Replace hyphens/underscores with spaces
		.replace(/\s+/g, ' ') // Normalize multiple spaces
		.trim()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');
}

// Convert to kebab-case (slug): "American Express" -> "american-express"
function toKebabCase(str: string): string {
	return decodeURIComponent(str)
		.toLowerCase()
		.replace(/\s+/g, '-') // Spaces to hyphens
		.replace(/[^a-z0-9-]/g, ''); // Remove special chars
}

// Save companies from GitHub folders to database
async function saveCompanies(): Promise<void> {
	console.log('📁 Fetching company folders from GitHub...');
	const folders = await getRepoFolders();
	console.log(`   Found ${folders.length} companies`);

	const startTime = Date.now();
	let saved = 0;

	for (const folder of folders) {
		const slug = toKebabCase(folder); // Normalize to slug format
		const name = toTitleCase(slug); // "american-express" -> "American Express"

		await prisma.company.upsert({
			where: { slug },
			update: { name },
			create: { name, slug },
		});

		saved++;

		if (saved % 100 === 0) {
			const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
			console.log(`   💾 Saved ${saved}/${folders.length} companies (${elapsed}s)`);
		}
	}

	const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
	console.log(`✅ Saved ${folders.length} companies in ${totalTime}s\n`);
}

async function saveCompanyProblems(companyId: string, problems: ParsedProblem[]): Promise<number> {
	let saved = 0;
	let skipped = 0;

	for (const p of problems) {
		const existingProblem = await prisma.problem.findUnique({
			where: { titleSlug: p.titleSlug },
			select: { id: true },
		});

		if (!existingProblem) {
			skipped++;
			continue;
		}

		await prisma.companyProblem.upsert({
			where: {
				companyId_problemId: {
					companyId,
					problemId: existingProblem.id,
				},
			},
			update: {
				priorityScore: p.priorityScore,
				frequency30Days: Math.round(p.frequency30Days),
				frequency3Months: Math.round(p.frequency3Months),
				frequency6Months: Math.round(p.frequency6Months),
				frequencyAllTime: Math.round(p.frequencyAllTime),
			},
			create: {
				companyId,
				problemId: existingProblem.id,
				priorityScore: p.priorityScore,
				frequency30Days: Math.round(p.frequency30Days),
				frequency3Months: Math.round(p.frequency3Months),
				frequency6Months: Math.round(p.frequency6Months),
				frequencyAllTime: Math.round(p.frequencyAllTime),
			},
		});

		saved++;
	}

	if (skipped > 0) {
		console.log(`   ⚠️  Skipped ${skipped} problems (not in Problem table)`);
	}

	return saved;
}

const BATCH_SIZE = 1; // Sequential to avoid connection limits

async function processOneCompany(folder: string, companyMap: Map<string, string>): Promise<number> {
	try {
		const slug = toKebabCase(folder);
		const companyId = companyMap.get(slug);

		if (!companyId) return 0;

		const problems = await processCompanyFolder(folder);
		if (problems.length === 0) return 0;

		return await saveCompanyProblems(companyId, problems);
	} catch (error) {
		console.error(`   ❌ Error processing ${folder}:`, error);
		return 0;
	}
}

async function syncAll() {
	console.log('🚀 Starting company data sync...');
	console.log(`📦 Repo: ${REPO_OWNER}/${REPO_NAME}\n`);

	const startTime = Date.now();

	// await saveCompanies(); // Uncomment to save companies first

	const companyMap = await getCompanyIds();
	const folders = await getRepoFolders();
	console.log(`${companyMap.size} companies in DB | ${folders.length} folders in GitHub\n`);

	let totalProblems = 0;
	let processed = 0;

	// Process in small batches with delay
	for (let i = 0; i < folders.length; i += BATCH_SIZE) {
		const batch = folders.slice(i, i + BATCH_SIZE);
		const results = await Promise.all(batch.map((folder) => processOneCompany(folder, companyMap)));

		totalProblems += results.reduce((sum, n) => sum + n, 0);
		processed += batch.length;

		const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
		console.log(
			`📦 ${processed}/${folders.length} companies (${totalProblems} problems) - ${elapsed}s`,
		);

		// Small delay between batches to let connections close
		await new Promise((r) => setTimeout(r, 300));
	}

	const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
	console.log(`\n🎉 Done! Synced ${totalProblems} problems in ${elapsed}s`);
}

const main = async () => {
	try {
		await syncAll();
	} catch (error) {
		console.error('❌ Error:', error);
	} finally {
		await prisma.$disconnect();
	}
};

main();
