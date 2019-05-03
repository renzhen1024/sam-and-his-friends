const {
	addActiveUsersToCache,
	getActiveUserFromCache,
	cleanCache,
} = require('../../../data/cache/active-users');
const { mockUsers } = require('../../test-helpers');

describe('Unit Test | data/cache/active-users', () => {
	afterEach(async () => {
		cleanCache();
	});

	test('It should add a single user to cache', async () => {
		const [user] = mockUsers;
		await addActiveUsersToCache(user);
		expect(await getActiveUserFromCache(user.id)).toEqual(user);
	});

	test('It should add a list of users to cache', async () => {
		const [user1, user2] = mockUsers;
		await addActiveUsersToCache(mockUsers);
		expect(await getActiveUserFromCache(user1.id)).toEqual(user1);
		expect(await getActiveUserFromCache(user2.id)).toEqual(user2);
	});

	test('It should return undefined when user not exist', async () => {
		const [user] = mockUsers;
		expect(await getActiveUserFromCache(user.id)).toBeUndefined();
	});
});
