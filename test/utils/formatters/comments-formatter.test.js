const {
	commentsFormatter,
} = require('../../../src/utils/formatters/comments-formatter');
const {
	formattedComments,
	mockComments,
} = require('../../../test/test-helpers/mock-data');

describe('Unit Test | utils/formatters/comments-formatter', () => {
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
