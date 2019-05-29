const moxios = require('moxios');
const request = require('supertest');
const app = require('../../src/app');

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

	test('It should fetch from renzhen1024.com', done => {
		// Due to `hbs.registerPartials` in `app.js` reads file async, need to ramp this in `setTimeout`, otherwise, test will be flaky with error that partile is not available.
		setTimeout(() => {
			request(app())
				.get('/')
				.expect(200)
				.then(() => {
					MAIN_CATEGORY.concat(COMMON_RESOURCE_MAP).forEach(
						({ URL }, index) => {
							expect(moxios.requests.at(index).url).toMatch(URL);
						}
					);
					done();
				});
		}, 1000);
	});

	test('It should fetch from renzhen1024.com - when visit subcategory', done => {
		// Due to `hbs.registerPartials` in `app.js` reads file async, need to ramp this in `setTimeout`, otherwise, test will be flaky with error that partile is not available.
		setTimeout(() => {
			request(app())
				.get(`/?subcategory=${encodeURI('文化逻辑')}`)
				.expect(200)
				.then(() => {
					SUB_CATEGORY.concat(COMMON_RESOURCE_MAP).forEach(({ URL }, index) => {
						expect(moxios.requests.at(index).url).toMatch(URL);
					});
					done();
				});
		}, 1000);
	});

	test('It should render a tempate that match snapshot', done => {
		// Due to `hbs.registerPartials` in `app.js` reads file async, need to ramp this in `setTimeout`, otherwise, test will be flaky with error that partile is not available.
		setTimeout(() => {
			request(app())
				.get('/')
				.expect(200)
				.then(result => {
					expect(result.text).toMatchSnapshot();
					done();
				});
		}, 1000);
	});
});
