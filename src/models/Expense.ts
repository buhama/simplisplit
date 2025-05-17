export interface Expense {
	id: string;
	group_id: string;
	description: string;
	amount: number;
	currency: string;
	paid_by: string; // group_member_id
	created_at: number;
	updated_at: number;
	category?: string;
	notes?: string;
}

export interface ExpenseSplit {
	id: string;
	expense_id: string;
	group_member_id: string;
	amount: number;
	created_at: number;
	updated_at: number;
}

export interface Settlement {
	id: string;
	group_id: string;
	payer_id: string; // group_member_id
	receiver_id: string; // group_member_id
	amount: number;
	currency: string;
	status: 'pending' | 'completed' | 'cancelled';
	created_at: number;
	updated_at: number;
}

export interface Balance {
	member_id: string;
	total_paid: number;
	total_owed: number;
	net_balance: number;
}

// Utility type for expense categories
export const ExpenseCategories = [
	'Food & Drinks',
	'Transportation',
	'Accommodation',
	'Activities',
	'Shopping',
	'Utilities',
	'Rent',
	'Other',
] as const;

export type ExpenseCategory = (typeof ExpenseCategories)[number];
