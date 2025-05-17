interface LocalMemberData {
	[groupId: string]: {
		memberId: string;
		name: string;
	};
}

export const loadLocalMember = (groupId: string) => {
	try {
		const storedData = localStorage.getItem('simplisplit_members');
		if (storedData) {
			console.log('storedData', storedData);
			const memberData: LocalMemberData = JSON.parse(storedData);
			console.log('memberData', memberData);
			if (memberData[groupId]) {
				return memberData[groupId];
			}
		}

		return null;
	} catch (error) {
		console.error('Error loading local member data:', error);
		return null;
	}
};
export const saveMember = (groupId: string, memberId: string, name: string) => {
	try {
		console.log('saving member', memberId, name, groupId);
		let memberData: LocalMemberData = {};
		const storedData = localStorage.getItem('simplisplit_members');

		if (storedData) {
			try {
				memberData = JSON.parse(storedData);
			} catch {
				// If JSON.parse fails, we'll use the empty object initialized above
			}
		}

		memberData[groupId] = { memberId, name };
		localStorage.setItem('simplisplit_members', JSON.stringify(memberData));
	} catch (error) {
		console.error('Error saving local member data:', error);
	}
};

export const clearMember = (groupId: string) => {
	try {
		const storedData = localStorage.getItem('simplisplit_members');
		if (storedData) {
			const memberData: LocalMemberData = JSON.parse(storedData);
			delete memberData[groupId];
			localStorage.setItem('simplisplit_members', JSON.stringify(memberData));
		}
	} catch (error) {
		console.error('Error clearing local member data:', error);
	}
};
