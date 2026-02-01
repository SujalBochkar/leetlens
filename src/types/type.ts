// ==================== LEETCODE TYPES ====================

export interface LCTopic {
	id: string;
	name: string;
	slug: string;
}

export interface LCCompany {
	id: string;
	name: string;
	slug: string;
	logoUrl: string | null;
	frequency?: number;
}

export interface LCProblem {
	id: string;
	questionNumber: string | null;
	title: string;
	titleSlug: string;
	difficulty: string;
	acceptanceRate: number | null;
	hasSolution: boolean;
	hasVideoSolution: boolean;
	isPaidOnly: boolean;
	status: string | null;
	topics: LCTopic[];
	companies: LCCompany[];
	// Legacy fields for backward compatibility
	isCompleted?: boolean;
	category?: string;
	statistics?: {
		totalAccepted: number;
		totalSubmitted: number;
	};
}

export interface LCCompanyWithCount {
	id: string;
	name: string;
	slug: string;
	logoUrl: string | null;
	problemCount: number;
}

export interface LCCompanyProblem extends Omit<LCProblem, 'companies'> {
	frequency: {
		'30days': number;
		'3months': number;
		'6months': number;
		all: number;
	};
	priorityScore: number;
}

export interface LCProblemsResponse {
	problems: LCProblem[];
	total: number;
	page: number;
	pageSize: number;
	totalPages: number;
}

export interface LCCompaniesResponse {
	companies: LCCompanyWithCount[];
	total: number;
}

export interface LCCompanyProblemsResponse {
	company: {
		id: string;
		name: string;
		slug: string;
		logoUrl: string | null;
	};
	problems: LCCompanyProblem[];
	stats: {
		total: number;
		easy: number;
		medium: number;
		hard: number;
	};
	total: number;
	page: number;
	pageSize: number;
	totalPages: number;
}

export interface LCSortConfig {
	key:
		| keyof LCProblem
		| 'acceptance'
		| 'totalAccepted'
		| 'totalSubmitted'
		| 'companiesCount'
		| null;
	direction: 'asc' | 'desc' | null;
}

// ==================== GFG TYPES ====================

export interface GFGProblem {
	id: string;
	isCompleted: boolean;
	title: string;
	difficulty: 'Easy' | 'Medium' | 'Hard';
	category: string;
	companies: {
		name: string;
		logo: string;
	}[];
	languages: {
		cpp?: {
			main_function_code: string;
			user_function_code: string;
		};
		java?: {
			main_function_code: string;
			user_function_code: string;
		};
		python?: {
			main_function_code: string;
			user_function_code: string;
		};
		javascript?: {
			main_function_code: string;
			user_function_code: string;
		};
	};
	question_content: string;
	question_answer1: string;
	question_answer2?: string;
}

export interface GFGSortConfig {
	key: keyof GFGProblem | 'companiesCount' | null;
	direction: 'asc' | 'desc' | null;
}
