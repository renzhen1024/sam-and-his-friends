/**
 * @module routes/single-post
 */

const { Router } = require('express');

const { singlePostFormatter } = include(
	'utils/formatters/single-post-formatter'
);
const { request } = include('data/request');
const { socialMedias } = include('utils/config');
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

		const {
			tags,
			title,
			views,
			numLikes,
			numComments,
			comments,
			name,
			content,
			date,
			reads,
			authorImageUrl,
			userProfileUrl,
		} = singlePostFormatter(topicResponse.data);

		res.render('singlePost', {
			tags,
			title,
			views,
			numLikes,
			numComments,
			comments,
			name,
			content,
			date,
			reads,
			authorImageUrl,
			socialMedias,
			userProfileUrl,
			isSinglePost: true,
		});
	});

	return router;
};
