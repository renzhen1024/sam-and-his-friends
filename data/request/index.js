/**
 * @module data/request/index
 * A wrapper for axios to send out AJAX request
 */

const axios = require('axios');

const { getFullUrlFromRequest } = require('../../data/request/interceptors');
const { isPro } = require('../../utils/isPro.js');
const { API } = require('../../utils/config');

if (!isPro()) {
	axios.interceptors.request.use(getFullUrlFromRequest);
}

/**
 * Get full path
 * @param {string} resource - A resource string with map to API endpoints
 */
function getFullpath(resource) {
	return `${API}${resource}.json`;
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
	return axios.get(getFullpath(resource), { params });
};
