const {
	addActiveUsersToCache,
	getActiveUserFromCache,
	cleanCache,
} = require('../../../data/cache/active-users');

const mockUsers = [
	{
		id: 9,
		username: 'Vivian',
		name: '',
		avatar_template: '/user_avatar/renzhen1024.com/vivian/{size}/40_2.png',
		title: '',
	},
	{
		id: 4,
		username: 'tningjs',
		name: 'Tao Ning',
		avatar_template: '/user_avatar/renzhen1024.com/tningjs/{size}/14_2.png',
		title: '山姆哥和他的小伙伴们',
	},
];

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
