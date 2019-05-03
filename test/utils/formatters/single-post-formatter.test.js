require('../../../setup-global')();

const { singlePostFormatter } = include(
	'utils/formatters/single-post-formatter'
);
const { addActiveUsersToCache, cleanCache } = include(
	'data/cache/active-users'
);
const {
	formattedUsers,
	mockPost,
	formattedPost: expectedFormattedPost,
} = include('test/test-helpers');

describe('Unit Test | utils/formatters/single-post-formatter', () => {
	beforeEach(async () => {
		const userWithSameId = formattedUsers[1];
		await addActiveUsersToCache(userWithSameId);
	});

	afterEach(async () => {
		cleanCache();
	});

	test('It should format a single posts', async () => {
		const formattedPost = await singlePostFormatter(mockPost);

		expect(formattedPost).toEqual(expectedFormattedPost);
	});
});
