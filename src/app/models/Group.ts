export interface Group {
	id: string;
	name: string;
	passcode?: string;
	description: string;
}

export interface GroupMember {
	id: string;
	name: string;
	group_id: string;
}
