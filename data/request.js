const axios = require('axios');

const DOMAIN = 'https://renzhen1024.com/';
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
