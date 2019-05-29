const { eq } = require('../../../src/views/hbs-helpers/eq');

describe('Views | HBS Helpers | eq', () => {
	test('It should compare two number correctly', () => {
		expect(eq(0, 0)).toBe(true);
		expect(eq(1, 1)).toBe(true);
		expect(eq(-1, -1)).toBe(true);

		expect(eq(-1, 1)).toBe(false);
		expect(eq(1, -1)).toBe(false);

		// No effect if there is more param
		expect(eq(0, 0, 1)).toBe(true);
	});
});
