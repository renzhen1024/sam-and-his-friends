const {
	singlePostFormatter,
} = require('../../../utils/formatters/single-post-formatter');

const {
	mockPost,
	formattedPost: expectedFormattedPost,
} = require('../../../test/test-helpers/mock-data');

describe('Unit Test | utils/formatters/single-post-formatter', () => {
	test('It should format a single posts', async () => {
		const formattedPost = await singlePostFormatter(mockPost);

		expect(formattedPost).toEqual(expectedFormattedPost);
	});
});
