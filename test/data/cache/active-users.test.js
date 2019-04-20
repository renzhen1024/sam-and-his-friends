const {
	addActiveUsersToCache,
	getActiveUserFromCache,
	cleanCache,
} = require('../../../data/cache/active-users');
const { mockUsers } = require('../../test-helpers');

describe('Unit Test | data/cache/active-users', () => {
	afterEach(() => {
		cleanCache();
	});

	test('It should add a single user to cache', () => {
		const [user] = mockUsers;
		addActiveUsersToCache(user);
		expect(getActiveUserFromCache(user.id)).toEqual(user);
	});

	test('It should add a list of users to cache', () => {
		const [user1, user2] = mockUsers;
		addActiveUsersToCache(mockUsers);
		expect(getActiveUserFromCache(user1.id)).toEqual(user1);
		expect(getActiveUserFromCache(user2.id)).toEqual(user2);
	});

	test('It should return undefined when user not exist', () => {
		const [user] = mockUsers;
		expect(getActiveUserFromCache(user.id)).toBeUndefined();
	});
});
