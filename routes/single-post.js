const { Router } = require('express');

const { singlePostFormatter } = include(
	'data/formatters/single-post-formatter'
);
const { request } = include('data/requests/request');
const { socialMedias } = include('utils/config');
const { DISCOURSE_RESOURCE_MAP } = include('utils/constants');
const { activeUsersFormatter } = include(
	'data/formatters/active-users-formatter'
);
const { addActiveUsersToCache } = include('data/cache/active-users');

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
