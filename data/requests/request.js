const axios = require('axios');

const { DOMAIN } = include('utils/constants');
/**
 * Discourse API: https://docs.discourse.org/
 * /c/{id}.json - Get a list of topics in the specified category
 * /t/{id}.json - Get a single topic
 * /posts/{id}.json - Get a single post
 */
const DISCOURSE_API_MAP = {
	category: 'topics/created-by/',
	miniPost: '',
	topic: 't/',
	post: 'posts/',
};

function _getUrl(type, id) {
	return `${DOMAIN}${DISCOURSE_API_MAP[type]}${id}.json`;
}

function request(requestType, reqParams = {}) {
	return axios.get(_getUrl(requestType, reqParams.id), {
		params: { ...reqParams, _: Date.now() },
	});
}

exports.request = request;
