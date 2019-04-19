const axios = require('axios');
const debug = require('debug')('sam-and-his-friends:request');

// Add request interceptors to log out full url
axios.interceptors.request.use(function getFullUrlFromRequest(config) {
	const { params, url } = config;
	const queryParamArray = Object.entries(params);
	let firstParam = true;
	const fullUrl = queryParamArray.reduce((acc, [key, value]) => {
		const separator = firstParam ? '?' : '&';
		firstParam = false;
		return `${acc}${separator}${key}=${value}`;
	}, url);
	debug(fullUrl);
	return config;
});

const { DOMAIN } = include('utils/constants');

function _getUrl(resource) {
	return `${DOMAIN}${resource}.json`;
}

function request(reqParams = {}) {
	const { resource, ...params } = reqParams;
	params._ = Date.now();
	return axios.get(_getUrl(resource), { params });
}

exports.request = request;
