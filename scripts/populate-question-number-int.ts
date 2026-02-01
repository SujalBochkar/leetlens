import db from '../src/server/db';

async function main() {
	console.log('Populating questionNumberInt from questionNumber...');

	// Get all problems with questionNumber
	const problems = await db.problem.findMany({
		select: {
			id: true,
			questionNumber: true,
		},
	});

	console.log(`Found ${problems.length} problems to update`);

	let updated = 0;
	let failed = 0;

	// Update each problem with the integer version
	for (const problem of problems) {
		if (problem.questionNumber) {
			const intValue = parseInt(problem.questionNumber, 10);
			if (!isNaN(intValue)) {
				await db.problem.update({
					where: { id: problem.id },
					data: { questionNumberInt: intValue },
				});
				updated++;
			} else {
				failed++;
				console.log(`Failed to parse: ${problem.questionNumber}`);
			}
		}
	}

	console.log(`Updated ${updated} problems, ${failed} failed`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await db.$disconnect();
	});
