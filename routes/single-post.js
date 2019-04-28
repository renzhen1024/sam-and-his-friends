/**
 * @module routes/single-post
 */

const { Router } = require('express');

const { singlePostFormatter } = include(
	'utils/formatters/single-post-formatter'
);
const { request } = include('data/request');
const { siteTitle, socialMedias } = include('utils/config');
const { DISCOURSE_RESOURCE_MAP } = include('utils/constants');
const { activeUsersFormatter } = include(
	'utils/formatters/active-users-formatter'
);
const { addActiveUsersToCache } = include('data/cache/active-users');

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

		addActiveUsersToCache(formattedActiveUsers);

		const formattedSinglePost = singlePostFormatter(topicResponse.data);

		res.render('singlePost', {
			...formattedSinglePost,
			siteTitle,
			socialMedias,
			isSinglePost: true,
		});
	});

	return router;
};
