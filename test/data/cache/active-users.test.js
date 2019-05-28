const rewire = require('rewire');
const sandbox = require('sinon').createSandbox();

const { formattedUsers } = require('../../test-helpers/mock-data');
const { REDIS_CONFIG } = require('../../../src/utils/constants.js');

const activeUsersModule = rewire('../../../src/data/cache/active-users');

describe('Unit Test | data/cache/active-users', () => {
	beforeAll(() => {
		const promisified = activeUsersModule.__get__('promisified');

		this.hsetSpy = sandbox.spy(promisified, 'hset');
		this.hgetSpy = sandbox.spy(promisified, 'hget');
	});

	afterEach(() => sandbox.resetHistory());

	afterAll(() => sandbox.restore());

	test('addActiveUsersToCache - single user', async () => {
		const [user] = formattedUsers;

		await activeUsersModule.addActiveUsersToCache(user);

		const [arg1, arg2, arg3] = this.hsetSpy.getCall(0).args;

		// Check params are pass in correct to redis client
		expect(arg1).toEqual(REDIS_CONFIG.HASHSET_NAME);
		expect(
			arg2.startsWith(`${REDIS_CONFIG.KEY_PREFIX.ACTIVE_USER}:`)
		).toBeTruthy();
		expect(arg3).toEqual(JSON.stringify(user));

		// Check only calls redis client once
		expect(this.hsetSpy.calledOnce).toBeTruthy();
	});

	test('addActiveUsersToCache - an array of users', async () => {
		await activeUsersModule.addActiveUsersToCache(formattedUsers);

		// Check calls redis client once for each user
		expect(this.hsetSpy.callCount).toEqual(formattedUsers.length);
	});

	test('getActiveUserFromCache', async () => {
		const [user] = formattedUsers;
		const activeUser = await activeUsersModule.getActiveUserFromCache(user.id);

		// Check params are pass in correct to redis client
		const [arg1, arg2] = this.hgetSpy.getCall(0).args;
		expect(arg1).toEqual(REDIS_CONFIG.HASHSET_NAME);
		expect(
			arg2.startsWith(`${REDIS_CONFIG.KEY_PREFIX.ACTIVE_USER}:`)
		).toBeTruthy();

		// Check result is parsed
		expect(activeUser).toEqual(user);
	});
});
