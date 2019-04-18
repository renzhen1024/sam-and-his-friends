const axios = require('axios');
const debug = require('debug')('sam-and-his-friends:request');

// Add request interceptors to log out full url
axios.interceptors.request.use(function getFullUrlFromRequest(config) {
	const { params, url } = config;
	const queryParamArray = Object.entries(params);
	const fullUrl = queryParamArray.reduce(
		(acc, [key, value]) => `${acc}&${key}=${value}`,
		queryParamArray.length === 0 ? url : `${url}?`
	);
	debug(fullUrl);
	return config;
});

const { DOMAIN } = include('utils/constants');

function _getUrl(resource) {
	return `${DOMAIN}${resource}.json`;
}

function request(reqParams = {}) {
	return axios.get(_getUrl(reqParams.resource), {
		params: { ...reqParams, _: Date.now() },
	});
}

exports.request = request;
