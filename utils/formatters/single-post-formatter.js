/**
 * @module utils/formatters/single-post-formatter
 */

const { getActiveUserFromCache } = require('../../data/cache/active-users-v2');
const {
	commentsFormatter,
} = require('../../utils/formatters/comments-formatter');
const { tagsFormatter } = require('../../utils/formatters/tags-formatter');
const { username } = require('../../utils/config');

/**
 * Format single post from API data for rendering
 * @param {object} postData - Data from API
 * @returns {object} Formatted post
 */
exports.singlePostFormatter = async function singlePostFormatter(postData) {
	const poster = await getActiveUserFromCache(postData.details.created_by.id);
	// Owner means the website owner who create article in index page
	const isPosterSiteOwner = username === poster.username.slice(1); // poster.username begins with `@`
	const { title, views, like_count: numLikes } = postData;
	const numComments = postData.posts_count + postData.reply_count;
	const post = postData.post_stream.posts[0];
	const comments = await commentsFormatter(postData.post_stream.posts.slice(1));
	const tags = tagsFormatter(postData.category_id);

	return {
		tags,
		title,
		views,
		numLikes,
		numComments,
		comments,
		isPosterSiteOwner,
		name: poster.name || poster.username,
		content: post.cooked,
		date: post.updated_at,
		reads: post.reads,
		authorImageUrl: poster.userImageUrl,
		userProfileUrl: poster.userProfileUrl,
	};
};
