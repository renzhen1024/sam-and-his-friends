const {
	activeUsersFormatter,
} = require('../../../src/utils/formatters/active-users-formatter');

const { mockUsers, formattedUsers } = require('../../test-helpers/mock-data');

describe('Unit Test | utils/formatters/active-users-formatter', () => {
	test('It should format an array of user', () => {
		const [expectedFormattedUser1, expectedFormattedUser2] = formattedUsers;

		const [user1, user2] = activeUsersFormatter(mockUsers);

		expect(user1).toEqual(expectedFormattedUser1);
		expect(user2).toEqual(expectedFormattedUser2);
	});
});
