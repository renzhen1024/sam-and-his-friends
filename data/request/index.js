/**
 * @module data/request/index.js
 * A wrapper for axios to send out AJAX request
 */

const axios = require('axios');

const { getFullUrlFromRequest } = include('data/request/interceptors');

if (process.env.NODE_ENV === 'development') {
	axios.interceptors.request.use(getFullUrlFromRequest);
}

const { DOMAIN } = include('utils/constants');

/**
 * Get full path
 * @param {string} resource - A resource string with map to API endpoints
 */
function _getFullpath(resource) {
	return `${DOMAIN}${resource}.json`;
}

/**
 * Build and send AJAX request, append current timestamp for cache in API
 * @param {object} reqParams - Used to build the request URL
 * @param {string} reqParams.resource - A resource string with map to API endpoints
 * @param {string} reqParams.queryParams - Query params in the URL
 */
exports.request = function request(reqParams = {}) {
	const { resource, queryParams: params = {} } = reqParams;
	params._ = Date.now();
	return axios.get(_getFullpath(resource), { params });
};
