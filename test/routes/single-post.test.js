const moxios = require('moxios');
const request = require('supertest');
const app = require('../../app');

const response = include('data/route-mocks/single-post.json');
const REQUEST_URL = /https:\/\/renzhen1024\.com\/t\/125.json\?_=\d+/;

function setupTest() {
	moxios.install();

	moxios.stubRequest(REQUEST_URL, {
		response,
		status: 200,
	});
}

describe('GET /single-post/:topicId', () => {
	beforeEach(() => {
		setupTest();
	});

	afterEach(() => {
		moxios.uninstall();
	});

	test('It should fetch from renzhen1024.com', async () => {
		await request(app()).get('/single-post/125');
		expect(moxios.requests.mostRecent().url).toMatch(REQUEST_URL);
	});

	test.skip('It should match snapshot', async () => {
		const result = await request(app()).get('/single-post/125');
		expect(result.text).toMatchSnapshot();
	});
});
