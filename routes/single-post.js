/**
 * @module routes/single-post
 */

const { Router } = require('express');

const {
	singlePostFormatter,
} = require('../utils/formatters/single-post-formatter');
const { request } = require('../data/request');
const { siteTitle, socialMedias } = require('../utils/config');
const { DISCOURSE_RESOURCE_MAP } = require('../utils/constants');
const {
	activeUsersFormatter,
} = require('../utils/formatters/active-users-formatter');
const { addActiveUsersToCache } = require('../data/cache/active-users-v2');

/**
 * Single post router
 * @param {object} router - router object init from express.Router
 * @returns router middleware
 */
module.exports = (router = new Router()) => {
	router.get('/:topicId', async (req, res) => {
		const topicResponse = await request({
			resource: DISCOURSE_RESOURCE_MAP.TOPIC(req.params.topicId),
		});

		const formattedActiveUsers = activeUsersFormatter(
			topicResponse.data.details.participants
		);

		await addActiveUsersToCache(formattedActiveUsers);

		const formattedSinglePost = await singlePostFormatter(topicResponse.data);

		res.render('singlePost', {
			...formattedSinglePost,
			siteTitle,
			socialMedias,
			isSinglePost: true,
		});
	});

	return router;
};
