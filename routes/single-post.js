const express = require('express');

const { singlePostFormatter } = include('data/formatters/post');
const { request } = include('data/requests/request');
const config = include('config');
const { API_REQUEST_TYPE } = include('utils/constants');

const router = express.Router();

/**
 * To get a single post in a topic:
 * 1. get topic id, query the topic to get a list of post id
 * 2. Use the first post id to query the post backend
 */
router.get('/:topicId', async (req, res) => {
	const { topicId } = req.params;
	const { data: topicResponse } = await request(API_REQUEST_TYPE.TOPIC, {
		id: topicId,
	});

	const { title } = topicResponse;
	const postId = topicResponse.post_stream.posts[0].id;

	const postResponse = await request(API_REQUEST_TYPE.POST, { id: postId });
	const post = singlePostFormatter(postResponse.data);

	res.render('singlePost', {
		...post,
		...config,
		title,
		isSinglePost: true,
	});
});

module.exports = router;
