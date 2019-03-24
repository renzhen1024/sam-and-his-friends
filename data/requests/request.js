const axios = require('axios');

const DOMAIN = 'https://renzhen1024.com/';
/**
 * Discourse API: https://docs.discourse.org/
 * /c/{id}.json - Get a list of topics in the specified category
 * /t/{id}.json - Get a single topic
 * /posts/{id}.json - Get a single post
 */
const DISCOURSE_API_MAP = {
	category: 'c/',
	topic: 't/',
	post: 'posts/',
};

function _getUrl(type, id) {
	return `${DOMAIN}${DISCOURSE_API_MAP[type]}${id}.json`;
}

function request(requestType, id) {
	const apiEndpoint = _getUrl(requestType, id);
	return axios.get(apiEndpoint);
}

exports.request = request;
