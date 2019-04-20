/**
 * @module utils/formatters/mini-posts-formatter
 */

/**
 * Format a mintPost
 * @param {object} mintPost - Data returns from API
 * @returns {object} Formatted mintPost
 */
function miniPostFormatter(miniPost) {
	return {
		id: miniPost.topic_id,
		title: miniPost.title,
		date: miniPost.created_at,
		content: miniPost.excerpt,
	};
}

/**
 * Format array of mintPostss from API data for rendering, filter them out ones
 * without content
 * @param {array} mintPostss - Array of mintPosts
 * @returns {array} Formatted mintPosts array
 */
exports.miniPostsFormatter = function miniPostsFormatter(miniPosts) {
	return miniPosts
		.map(miniPost => miniPostFormatter(miniPost))
		.filter(miniPost => !!miniPost.content);
};
