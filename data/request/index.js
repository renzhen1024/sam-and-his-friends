const axios = require('axios');

const { getFullUrlFromRequest } = include('data/request/interceptors');

axios.interceptors.request.use(getFullUrlFromRequest);

const { DOMAIN } = include('utils/constants');

function _getUrl(resource) {
	return `${DOMAIN}${resource}.json`;
}

function request(reqParams = {}) {
	const { resource, ...params } = reqParams;
	params._ = Date.now();
	return axios.get(_getUrl(resource), { params });
}

exports.request = request;
