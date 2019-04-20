const axios = require('axios');
const sandbox = require('sinon').createSandbox();

require('../../../setup-global')();

describe('Unit Test | data/request/index', () => {
	let env;
	let getStub;
	let useSpy;
	const timestamp = 1555761646302;

	beforeAll(() => {
		sandbox.stub(Date, 'now').callsFake(() => timestamp);
		getStub = sandbox.stub(axios, 'get');
		useSpy = sandbox.spy(axios.interceptors.request, 'use');
	});

	beforeEach(() => {
		env = process.env.NODE_ENV;
	});

	afterEach(() => {
		process.env.NODE_ENV = env;
		sandbox.resetHistory();
	});

	afterAll(() => {
		sandbox.restore();
	});

	test('Interceptors is added in development environment', () => {
		process.env.NODE_ENV = 'development';
		// eslint-disable-next-line global-require
		require('../../../data/request/index');
		expect(useSpy.calledOnce).toBeTruthy();
	});

	test('Interceptors is not added in production environment', () => {
		process.env.NODE_ENV = 'production';
		// eslint-disable-next-line global-require
		require('../../../data/request/index');
		expect(useSpy.calledOnce).toBeFalsy();
	});

	describe('Test axios.get', () => {
		let request;
		beforeAll(() => {
			// eslint-disable-next-line
			request = require('../../../data/request/index').request;
		});

		test('Pass in params to axios.get properly - no queryParams', () => {
			request({ resource: 't/123' });

			expect(getStub.args[0][0]).toEqual('https://renzhen1024.com/t/123.json');

			// Timestamp is append for request
			expect(getStub.args[0][1]).toEqual({
				params: { _: timestamp },
			});
		});

		test('Pass in params to axios.get properly - with queryParams', () => {
			const queryParams = {
				username: 'mountainsun1988',
				offset: 0,
				filter: 5,
				no_results_help_key: 'user_activity.no_replies',
			};

			request({
				queryParams,
				resource: 'user_actions',
			});

			expect(getStub.args[0][0]).toEqual(
				'https://renzhen1024.com/user_actions.json'
			);

			expect(getStub.args[0][1]).toEqual({
				params: {
					_: timestamp,
					...queryParams,
				},
			});
		});
	});
});
