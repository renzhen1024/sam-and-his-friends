const express = require('express');

const { singlePostFormatter } = include(
	'data/formatters/single-post-formatter'
);
const { request } = include('data/requests/request');
const { socialMedias } = include('utils/config');
const { DISCOURSE_RESOURCE_MAP } = include('utils/constants');

const router = express.Router();

/**
 * To get a single post in a topic:
 * 1. get topic id, query the topic to get a list of post id
 * 2. Use the first post id to query the post backend
 */
router.get('/:topicId', async (req, res) => {
	const topicResponse = await request({
		resource: DISCOURSE_RESOURCE_MAP.TOPIC(req.params.topicId),
	});

	const {
		title,
		views,
		numLikes,
		numComments,
		name,
		content,
		date,
		reads,
		authorImageUrl,
	} = singlePostFormatter(topicResponse.data);

	res.render('singlePost', {
		title,
		views,
		numLikes,
		numComments,
		name,
		content,
		date,
		reads,
		authorImageUrl,
		socialMedias,
		isSinglePost: true,
	});
});

module.exports = router;
