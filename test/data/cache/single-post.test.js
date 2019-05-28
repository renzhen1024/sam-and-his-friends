const rewire = require('rewire');
const sandbox = require('sinon').createSandbox();

const { formattedPosts } = require('../../test-helpers/mock-data');
const { REDIS_CONFIG } = require('../../../src/utils/constants.js');

const singlePostModule = rewire('../../../src/data/cache/single-post');

describe('Unit Test | data/cache/single-post', () => {
	beforeAll(() => {
		const promisified = singlePostModule.__get__('promisified');

		this.hsetSpy = sandbox.spy(promisified, 'hset');
		this.hgetSpy = sandbox.spy(promisified, 'hget');
	});

	afterEach(() => sandbox.resetHistory());

	afterAll(() => sandbox.restore());

	test('addPostToCache - single user', async () => {
		const [post] = formattedPosts;

		await singlePostModule.addPostToCache(post);

		const [arg1, arg2, arg3] = this.hsetSpy.getCall(0).args;

		// Check params are pass in correct to redis client
		expect(arg1).toEqual(REDIS_CONFIG.HASHSET_NAME);
		expect(
			arg2.startsWith(`${REDIS_CONFIG.KEY_PREFIX.SINGLE_POST}:`)
		).toBeTruthy();
		expect(arg3).toEqual(JSON.stringify(post));

		// Check only calls redis client once
		expect(this.hsetSpy.calledOnce).toBeTruthy();
	});

	test('getPostFromCache', async () => {
		const [post] = formattedPosts;
		const singlePost = await singlePostModule.getPostFromCache(post.id);

		// Check params are pass in correct to redis client
		const [arg1, arg2] = this.hgetSpy.getCall(0).args;
		expect(arg1).toEqual(REDIS_CONFIG.HASHSET_NAME);
		expect(
			arg2.startsWith(`${REDIS_CONFIG.KEY_PREFIX.SINGLE_POST}:`)
		).toBeTruthy();

		// Check result is parsed
		expect(singlePost).toEqual(post);
	});
});
