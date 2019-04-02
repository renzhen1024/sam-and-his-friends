const axios = require('axios');

const { DOMAIN } = include('utils/constants');

function _getUrl(path, resource) {
	return `${DOMAIN}${path}${resource}.json`;
}

function request(path, reqParams = {}) {
	return axios.get(_getUrl(path, reqParams.resource), {
		params: { ...reqParams, _: Date.now() },
	});
}

exports.request = request;
