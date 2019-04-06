const { getActiveUserFromCache } = include('data/cache/active-users');

function commentFormatter(comment) {
	const commenter = getActiveUserFromCache(comment.user_id);

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
 * Format comments
 * Notice that Discourse take pin/unpin as comment and this kind of comment doesn't has any contents
 *
 * @param {Array} comments
 * @returns {Array}
 */
function commentsFormatter(comments) {
	return comments
		.map(comment => commentFormatter(comment))
		.filter(comment => !!comment.content);
}

exports.commentsFormatter = commentsFormatter;
