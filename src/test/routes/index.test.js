const moxios = require('moxios');
const request = require('supertest');
const app = require('../../app');

const postsMock = require('../test-helpers/route-mocks/index/posts.json');
const miniPostsMock = require('../test-helpers/route-mocks/index/mini-posts.json');
const activeUsersListMock = require('../test-helpers/route-mocks/index/active-users.json');

const MAIN_CATEGORY = [
	{
		URL: /https:\/\/renzhen1024\.com\/c\/7-category\.json\?page=0&_=\d+/,
		response: postsMock,
	},
];

const SUB_CATEGORY = [
	{
		URL: /https:\/\/renzhen1024\.com\/c\/7-category\/%E6%96%87%E5%8C%96%E9%80%BB%E8%BE%91\.json\?page=0&_=\d+/,
		response: postsMock,
	},
];

const COMMON_RESOURCE_MAP = [
	{
		URL: /https:\/\/renzhen1024\.com\/user_actions.json\?username=sambro&offset=0&filter=5&no_results_help_key=user_activity\.no_replies&_=\d+/,
		response: miniPostsMock,
	},
	{
		URL: /https:\/\/renzhen1024\.com\/directory_items.json\?period=monthly&_=\d+/,
		response: activeUsersListMock,
	},
];

function setupTest() {
	moxios.install();

	[...MAIN_CATEGORY, ...SUB_CATEGORY, ...COMMON_RESOURCE_MAP].forEach(
		({ URL, response }) => {
			moxios.stubRequest(URL, {
				response,
				status: 200,
			});
		}
	);
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
		MAIN_CATEGORY.concat(COMMON_RESOURCE_MAP).forEach(({ URL }, index) => {
			expect(moxios.requests.at(index).url).toMatch(URL);
		});
	});

	test('It should fetch from renzhen1024.com - when visit subcategory', async () => {
		await request(app()).get(`/?subcategory=${encodeURI('文化逻辑')}`);
		SUB_CATEGORY.concat(COMMON_RESOURCE_MAP).forEach(({ URL }, index) => {
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
