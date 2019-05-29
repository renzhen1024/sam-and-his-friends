const moxios = require('moxios');
const request = require('supertest');
const app = require('../../src/app');

const response = require('../test-helpers/route-mocks/single-post.json');

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

	test('It should fetch from renzhen1024.com', done => {
		// Due to `hbs.registerPartials` in `app.js` reads file async, need to ramp this in `setTimeout`, otherwise, test will be flaky with error that partile is not available.
		setTimeout(() => {
			request(app())
				.get('/single-post/125')
				.then(() => {
					expect(moxios.requests.mostRecent().url).toMatch(REQUEST_URL);
					done();
				});
		}, 1000);
	});

	test('It should match snapshot', done => {
		// Due to `hbs.registerPartials` in `app.js` reads file async, need to ramp this in `setTimeout`, otherwise, test will be flaky with error that partile is not available.
		setTimeout(() => {
			request(app())
				.get('/single-post/125')
				.then(result => {
					expect(result.text).toMatchSnapshot();
					done();
				});
		}, 1000);
	});
});
