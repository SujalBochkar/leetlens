import prisma from '@/server/db';

export const Topics = [
	{
		name: 'Array',
		slug: 'array',
	},
	{
		name: 'String',
		slug: 'string',
	},
	{
		name: 'Hash Table',
		slug: 'hash-table',
	},
	{
		name: 'Math',
		slug: 'math',
	},
	{
		name: 'Dynamic Programming',
		slug: 'dynamic-programming',
	},
	{
		name: 'Sorting',
		slug: 'sorting',
	},
	{
		name: 'Greedy',
		slug: 'greedy',
	},
	{
		name: 'Depth-First Search',
		slug: 'depth-first-search',
	},
	{
		name: 'Binary Search',
		slug: 'binary-search',
	},
	{
		name: 'Database',
		slug: 'database',
	},
	{
		name: 'Matrix',
		slug: 'matrix',
	},
	{
		name: 'Bit Manipulation',
		slug: 'bit-manipulation',
	},
	{
		name: 'Tree',
		slug: 'tree',
	},
	{
		name: 'Breadth-First Search',
		slug: 'breadth-first-search',
	},
	{
		name: 'Two Pointers',
		slug: 'two-pointers',
	},
	{
		name: 'Prefix Sum',
		slug: 'prefix-sum',
	},
	{
		name: 'Heap (Priority Queue)',
		slug: 'heap-priority-queue',
	},
	{
		name: 'Simulation',
		slug: 'simulation',
	},
	{
		name: 'Counting',
		slug: 'counting',
	},
	{
		name: 'Graph',
		slug: 'graph',
	},
	{
		name: 'Binary Tree',
		slug: 'binary-tree',
	},
	{
		name: 'Stack',
		slug: 'stack',
	},
	{
		name: 'Sliding Window',
		slug: 'sliding-window',
	},
	{
		name: 'Enumeration',
		slug: 'enumeration',
	},
	{
		name: 'Design',
		slug: 'design',
	},
	{
		name: 'Backtracking',
		slug: 'backtracking',
	},
	{
		name: 'Union Find',
		slug: 'union-find',
	},
	{
		name: 'Number Theory',
		slug: 'number-theory',
	},
	{
		name: 'Linked List',
		slug: 'linked-list',
	},
	{
		name: 'Ordered Set',
		slug: 'ordered-set',
	},
	{
		name: 'Segment Tree',
		slug: 'segment-tree',
	},
	{
		name: 'Monotonic Stack',
		slug: 'monotonic-stack',
	},
	{
		name: 'Trie',
		slug: 'trie',
	},
	{
		name: 'Divide and Conquer',
		slug: 'divide-and-conquer',
	},
	{
		name: 'Combinatorics',
		slug: 'combinatorics',
	},
	{
		name: 'Bitmask',
		slug: 'bitmask',
	},
	{
		name: 'Recursion',
		slug: 'recursion',
	},
	{
		name: 'Queue',
		slug: 'queue',
	},
	{
		name: 'Geometry',
		slug: 'geometry',
	},
	{
		name: 'Binary Indexed Tree',
		slug: 'binary-indexed-tree',
	},
	{
		name: 'Memoization',
		slug: 'memoization',
	},
	{
		name: 'Hash Function',
		slug: 'hash-function',
	},
	{
		name: 'Binary Search Tree',
		slug: 'binary-search-tree',
	},
	{
		name: 'Shortest Path',
		slug: 'shortest-path',
	},
	{
		name: 'String Matching',
		slug: 'string-matching',
	},
	{
		name: 'Topological Sort',
		slug: 'topological-sort',
	},
	{
		name: 'Rolling Hash',
		slug: 'rolling-hash',
	},
	{
		name: 'Game Theory',
		slug: 'game-theory',
	},
	{
		name: 'Interactive',
		slug: 'interactive',
	},
	{
		name: 'Data Stream',
		slug: 'data-stream',
	},
	{
		name: 'Monotonic Queue',
		slug: 'monotonic-queue',
	},
	{
		name: 'Brainteaser',
		slug: 'brainteaser',
	},
	{
		name: 'Doubly-Linked List',
		slug: 'doubly-linked-list',
	},
	{
		name: 'Merge Sort',
		slug: 'merge-sort',
	},
	{
		name: 'Randomized',
		slug: 'randomized',
	},
	{
		name: 'Counting Sort',
		slug: 'counting-sort',
	},
	{
		name: 'Iterator',
		slug: 'iterator',
	},
	{
		name: 'Concurrency',
		slug: 'concurrency',
	},
	{
		name: 'Quickselect',
		slug: 'quickselect',
	},
	{
		name: 'Suffix Array',
		slug: 'suffix-array',
	},
	{
		name: 'Line Sweep',
		slug: 'line-sweep',
	},
	{
		name: 'Probability and Statistics',
		slug: 'probability-and-statistics',
	},
	{
		name: 'Minimum Spanning Tree',
		slug: 'minimum-spanning-tree',
	},
	{
		name: 'Bucket Sort',
		slug: 'bucket-sort',
	},
	{
		name: 'Shell',
		slug: 'shell',
	},
	{
		name: 'Reservoir Sampling',
		slug: 'reservoir-sampling',
	},
	{
		name: 'Strongly Connected Component',
		slug: 'strongly-connected-component',
	},
	{
		name: 'Eulerian Circuit',
		slug: 'eulerian-circuit',
	},
	{
		name: 'Radix Sort',
		slug: 'radix-sort',
	},
	{
		name: 'Rejection Sampling',
		slug: 'rejection-sampling',
	},
	{
		name: 'Biconnected Component',
		slug: 'biconnected-component',
	},
];

async function main() {
	console.log('🚀 Starting to sync topics...');
	let count = 0;

	for (const topic of Topics) {
		await prisma.topic.upsert({
			where: { slug: topic.slug },
			update: { name: topic.name },
			create: {
				name: topic.name,
				slug: topic.slug,
			},
		});
		count++;
		if (count % 10 === 0) console.log(`✅ Synced ${count} topics...`);
	}

	console.log(`✨ Successfully synced all ${count} topics!`);
}

main()
	.catch((e) => {
		console.error('❌ Error syncing topics:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
