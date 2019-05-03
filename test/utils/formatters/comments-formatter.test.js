require('../../../setup-global')();

const { commentsFormatter } = include('utils/formatters/comments-formatter');
const { addActiveUsersToCache, cleanCache } = include(
	'data/cache/active-users'
);
const { formattedComments, formattedUsers, mockComments } = include(
	'test/test-helpers'
);

describe('Unit Test | utils/formatters/comments-formatter', () => {
	beforeEach(async () => {
		const userWithSameId = formattedUsers[1];
		await addActiveUsersToCache(userWithSameId);
	});

	afterEach(async () => {
		cleanCache();
	});

	test('It should format an array of comments', async () => {
		const [
			expectedFormattedComment1,
			expectedFormattedComment2,
		] = formattedComments;

		const resultArray = await commentsFormatter(mockComments);
		const [comment1, comment2] = resultArray;

		expect(resultArray.length).toEqual(2);
		expect(comment1).toEqual(expectedFormattedComment1);
		expect(comment2).toEqual(expectedFormattedComment2);
	});
});
