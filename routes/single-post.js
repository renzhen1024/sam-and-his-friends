const express = require('express');

const { singlePostFormatter } = include(
	'data/formatters/single-post-formatter'
);
const { request } = include('data/requests/request');
const { siteInfo } = include('utils/config');
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

	const { title } = topicResponse.data;

	const post = singlePostFormatter(topicResponse.data.post_stream.posts[0]);

	res.render('singlePost', {
		...post,
		...siteInfo,
		title,
		isSinglePost: true,
	});
});

module.exports = router;
