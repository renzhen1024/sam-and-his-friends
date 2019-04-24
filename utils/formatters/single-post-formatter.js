/**
 * @module utils/formatters/single-post-formatter
 */

const { getActiveUserFromCache } = include('data/cache/active-users');
const { commentsFormatter } = include('utils/formatters/comments-formatter');
const { tagsFormatter } = include('utils/formatters/tags-formatter');

/**
 * Format single post from API data for rendering
 * @param {object} postData - Data from API
 * @returns {object} Formatted post
 */
exports.singlePostFormatter = function singlePostFormatter(postData) {
	const poster = getActiveUserFromCache(postData.details.created_by.id);
	const { title, views, like_count: numLikes } = postData;
	const numComments = postData.posts_count + postData.reply_count;
	const post = postData.post_stream.posts[0];
	const comments = commentsFormatter(postData.post_stream.posts.slice(1));
	const tags = tagsFormatter(postData.category_id);

	return {
		tags,
		title,
		views,
		numLikes,
		numComments,
		comments,
		name: poster.name || poster.username,
		content: post.cooked,
		date: post.updated_at,
		reads: post.reads,
		authorImageUrl: poster.userImageUrl,
		userProfileUrl: poster.userProfileUrl,
	};
};
