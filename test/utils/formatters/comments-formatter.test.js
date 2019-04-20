require('../../../setup-global')();

const { commentsFormatter } = include('utils/formatters/comments-formatter');
const { addActiveUsersToCache, cleanCache } = include(
	'data/cache/active-users'
);
const { formattedComments, formattedUsers, mockComments } = include(
	'test/test-helpers'
);

describe('Unit Test | utils/formatters/comments-formatter', () => {
	beforeEach(() => {
		const userWithSameId = formattedUsers[1];
		addActiveUsersToCache(userWithSameId);
	});

	afterEach(() => {
		cleanCache();
	});

	test('It should format an array of comments', () => {
		const [
			expectedFormattedComment1,
			expectedFormattedComment2,
		] = formattedComments;

		const resultArray = commentsFormatter(mockComments);
		const [comment1, comment2] = resultArray;

		expect(resultArray.length).toEqual(2);
		expect(comment1).toEqual(expectedFormattedComment1);
		expect(comment2).toEqual(expectedFormattedComment2);
	});
});
