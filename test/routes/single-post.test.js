const moxios = require('moxios');
const request = require('supertest');

const app = require('../../src/app');
// Due to `hbs.registerPartials` in `app.js` reads file async, need to wait for it, otherwise, test will be flaky with error that partile is not available.
const { wait } = require('../test-helpers/helpers');

const response = require('../test-helpers/route-mocks/single-post.json');

const REQUEST_URL = /https:\/\/renzhen1024\.com\/t\/125.json\?_=\d+/;

function setupTest() {
	moxios.install();

	moxios.stubRequest(REQUEST_URL, {
		response,
		status: 200,
	});
}

describe('Route | single-post', () => {
	beforeEach(() => {
		setupTest();
	});

	afterEach(() => {
		moxios.uninstall();
	});

	test('It should fetch from renzhen1024.com', async () => {
		await wait(1000);
		await request(app()).get('/single-post/125');

		expect(moxios.requests.mostRecent().url).toMatch(REQUEST_URL);
	});

	test('It should match snapshot', async () => {
		await wait(1000);
		const result = await request(app()).get('/single-post/125');

		expect(result.text).toMatchSnapshot();
	});
});
