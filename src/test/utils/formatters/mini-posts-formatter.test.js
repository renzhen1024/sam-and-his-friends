const {
	miniPostsFormatter,
} = require('../../../utils/formatters/mini-posts-formatter');
const {
	mockMiniPosts,
	formattedMiniPosts,
} = require('../../../test/test-helpers/mock-data');

describe('Unit Test | utils/formatters/mini-posts-formatter', () => {
	test('It should format an array of miniPosts', () => {
		const [
			expectedFormattedMiniPost1,
			expectedFormattedMiniPost2,
		] = formattedMiniPosts;

		const resultArray = miniPostsFormatter(mockMiniPosts);
		const [comment1, comment2] = resultArray;

		expect(resultArray.length).toEqual(2); // Empty content is filtered out
		expect(comment1).toEqual(expectedFormattedMiniPost1);
		expect(comment2).toEqual(expectedFormattedMiniPost2);
	});
});
