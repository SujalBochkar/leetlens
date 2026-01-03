export type ProblemRow = {
	Difficulty: string;
	Title: string;
	Frequency: number;
	AcceptanceRate: string;
	Link: string;
	Topics: string;
};

export type MergedRow = {
	Difficulty: string;
	Title: string;
	AcceptanceRate: string;
	Link: string;
	Topics: string;
	PriorityScore: string;
	[key: string]: string | number; // For dynamic window frequency columns
};
