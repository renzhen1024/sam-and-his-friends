/**
 * @module routes/single-post
 */

const { Router } = require('express');

const {
	singlePostFormatter,
} = require('../utils/formatters/single-post-formatter');
const { request } = require('../data/request');
const { siteTitle, socialMedias, subCategories } = require('../utils/config');
const { DISCOURSE_RESOURCE_MAP } = require('../utils/constants');
const {
	activeUsersFormatter,
} = require('../utils/formatters/active-users-formatter');
const { addActiveUsersToCache } = require('../data/cache/active-users');

/**
 * Single post router
 * @param {object} router - router object init from express.Router
 * @returns router middleware
 */
module.exports = (router = new Router()) => {
	router.get('/:topicId', async (req, res) => {
		const metaTags = [
			{
				type: 'og:image',
				content: 'https://samandhisfriends.com/images/post-og-image.jpg',
			},
			{
				type: 'og:type',
				content: 'article',
			},
		];

		const topicResponse = await request({
			resource: DISCOURSE_RESOURCE_MAP.TOPIC(req.params.topicId),
		});
		metaTags.push({
			type: 'og:url',
			content: `https://samandhisfriends.com/single-post/${req.params.topicId}`,
		});

		const formattedActiveUsers = activeUsersFormatter(
			topicResponse.data.details.participants
		);
		await addActiveUsersToCache(formattedActiveUsers);

		const formattedSinglePost = await singlePostFormatter(topicResponse.data);
		metaTags.push({ type: 'og:title', content: formattedSinglePost.title });
		metaTags.push({
			type: 'og:description',
			content: formattedSinglePost.excerpt,
		});

		res.render('singlePost', {
			metaTags,
			siteTitle,
			socialMedias,
			subCategories,
			isSinglePost: true,
			...formattedSinglePost,
		});
	});

	return router;
};
