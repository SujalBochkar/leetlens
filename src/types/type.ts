export interface LCProblem {
	id: string;
	isCompleted: boolean;
	title: string;
	difficulty: string;
	category: string;
	statistics: {
		totalAccepted: number;
		totalSubmitted: number;
	};
	companies: {
		name: string;
		logo: string;
	}[];
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
