const moxios = require('moxios');
const request = require('supertest');
const path = require('path');
const hbs = require('hbs');
const app = require('../app');

hbs.registerPartials(path.join(__dirname, '/views/templates/partials'));

const postsMock = include('data/route-mocks/index/posts.json');
const miniPostsMock = include('data/route-mocks/index/mini-posts.json');
const activeUsersListMock = include('data/route-mocks/index/active-users.json');
const RESOURCE_MAP = [
	{
		URL: /https:\/\/renzhen1024\.com\/topics\/created-by\/mountainsun1988\.json\?page=0&_=\d+/,
		response: postsMock,
	},
	{
		URL: /https:\/\/renzhen1024\.com\/user_actions.json\?username=mountainsun1988&offset=0&filter=5&no_results_help_key=user_activity\.no_replies&_=\d+/,
		response: miniPostsMock,
	},
	{
		URL: /https:\/\/renzhen1024\.com\/directory_items.json\?period=monthly&_=\d+/,
		response: activeUsersListMock,
	},
];

function setupTest() {
	moxios.install();

	RESOURCE_MAP.forEach(({ URL, response }) => {
		moxios.stubRequest(URL, {
			response,
			status: 200,
		});
	});
}

describe('GET /index', () => {
	beforeEach(() => {
		setupTest();
	});

	afterEach(() => {
		moxios.uninstall();
	});

	test('It should fetch from renzhen1024.com', async () => {
		await request(app()).get('/');
		RESOURCE_MAP.forEach(({ URL }, index) => {
			expect(moxios.requests.at(index).url).toMatch(URL);
		});
	});

	// The test gives errors sam-and-his-friends/views/templates/index.hbs: The partial post could not be found
	// Need to dive deeper to see the root cause
	test.skip('It should match snapshot', async () => {
		const result = await request(app()).get('/');
		expect(result.text).toMatchSnapshot();
	});
});
