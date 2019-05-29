const request = require('supertest');

const app = require('../../src/app');

describe('Route | 404', () => {
	test('It should match snapshot', async () => {
		const result = await request(app()).get('/not-exist');

		expect(result.text).toMatchSnapshot();
	});
});
