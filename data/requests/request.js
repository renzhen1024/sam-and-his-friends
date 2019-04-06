const axios = require('axios');

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
