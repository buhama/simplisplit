export interface Group {
	id: string;
	name: string;
	passcode?: string;
	description: string;
	created_at: number;
	updated_at: number;
}

export interface GroupMember {
	id: string;
	name: string;
	group_id: string;
	created_at: number;
	updated_at: number;
}
