const debug = require('debug');
const sandbox = require('sinon').createSandbox();
const { getFullUrlFromRequest } = require('../../../data/request/interceptors');

describe('Unit Test | data/request/interceptors', () => {
	let logStub;
	beforeAll(() => {
		debug.enable('sam-and-his-friends:request');
		logStub = sandbox.stub(debug, 'log');
	});

	afterEach(() => {
		sandbox.resetHistory();
	});

	afterAll(() => {
		sandbox.restore();
	});

	test.skip('It should return full url - non query params', () => {
		const config = {
			url: 'https://renzhen1024.com/topics/created-by/mountainsun1988.json',
		};
		const returnVal = getFullUrlFromRequest(config);

		const output = logStub.args[0][0];
		const expectedOutput = /https:\/\/renzhen1024\.com\/topics\/created-by\/mountainsun1988.json$/;

		// config object is not been modified
		expect(returnVal).toBe(config);

		// should only calls once to log output
		expect(logStub.calledOnce).toBeTruthy();

		// has to use RegExp due to debug attached time stamp in the output
		expect(expectedOutput.test(output)).toBeTruthy();
	});

	test.skip('It should return full url - one query param', () => {
		const config = {
			url: 'https://renzhen1024.com/topics/created-by/mountainsun1988.json',
			params: { page: 0 },
		};
		const returnVal = getFullUrlFromRequest(config);

		const output = logStub.args[0][0];
		const expectedOutput = /https:\/\/renzhen1024\.com\/topics\/created-by\/mountainsun1988.json\?page=0$/;

		// config object is not been modified
		expect(returnVal).toBe(config);

		// should only calls once to log output
		expect(logStub.calledOnce).toBeTruthy();

		// has to use RegExp due to debug attached time stamp in the output
		expect(expectedOutput.test(output)).toBeTruthy();
	});

	test.skip('It should return full url - more than one query params', () => {
		const config = {
			url: 'https://renzhen1024.com/topics/created-by/mountainsun1988.json',
			params: { page: 0, _: 1555752535977 },
		};
		const returnVal = getFullUrlFromRequest(config);

		const output = logStub.args[0][0];
		const expectedOutput = /https:\/\/renzhen1024\.com\/topics\/created-by\/mountainsun1988.json\?page=0&_=1555752535977$/;

		// config object is not been modified
		expect(returnVal).toBe(config);

		// should only calls once to log output
		expect(logStub.calledOnce).toBeTruthy();

		// has to use RegExp due to debug attached time stamp in the output
		expect(expectedOutput.test(output)).toBeTruthy();
	});
});
