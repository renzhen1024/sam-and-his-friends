/**
 * @module data/request/interceptors
 * Interceptors for axios
 */

const debug = require('debug')('sam-and-his-friends:request');

/**
 * Add request interceptors to log out full url
 * @param {object} config - object pass in from axios request
 */
exports.getFullUrlFromRequest = function getFullUrlFromRequest(config) {
	let firstParam = true;
	const { params, url } = config;
	const queryParamArray =
		typeof params === 'object' ? Object.entries(params) : [];

	const fullUrl = queryParamArray.reduce((acc, [key, value]) => {
		const separator = firstParam ? '?' : '&';
		firstParam = false;
		return `${acc}${separator}${key}=${value}`;
	}, url);

	debug(fullUrl);

	return config;
};
