/**
 * @module utils/formatters/comments-formatter
 */

const { getActiveUserFromCache } = require('../../data/cache/active-users');

/**
 * Format a comment
 * @param {object} comment - Data returns from API
 * @returns {object} Formatted comment
 */
async function commentFormatter(comment) {
	const commenter =
		(await getActiveUserFromCache(comment.user_id)) || Promise.resolve({});

	return {
		name: commenter.name || commenter.username,
		authorImageUrl: commenter.userImageUrl,
		userProfileUrl: commenter.userProfileUrl,
		content: comment.cooked,
		date: comment.updated_at,
		reads: comment.reads,
	};
}

/**
 * Format array of comments from API data for rendering
 * Notice that Discourse take pin/unpin as comment and this kind of comment
 * doesn't has any meaningful contents. So filter them out.
 * @param {array} comments - Array of comments
 * @returns {array} Formatted comments array
 */
exports.commentsFormatter = function commentsFormatter(comments) {
	return Promise.all(comments.map(comment => commentFormatter(comment))).then(
		mappedComments => mappedComments.filter(comment => !!comment.content)
	);
};
