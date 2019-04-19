const debug = require('debug')('sam-and-his-friends:request');

// Add request interceptors to log out full url
function getFullUrlFromRequest(config) {
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
}

exports.getFullUrlFromRequest = getFullUrlFromRequest;
