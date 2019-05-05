/**
 * @module utils/formatters/posts-formatter
 */

const { getActiveUserFromCache } = require('../../data/cache/active-users');
// const { getPostFromCache } = require('../../data/cache/single-post');
const { tagsFormatter } = require('../../utils/formatters/tags-formatter');
/**
 * Format post from API data for rendering
 * @param {object} post - Data from API
 * @returns {object} Formatted post
 */
async function postFormatter(post) {
	// The first poster is the topic author
	const poster = await getActiveUserFromCache(post.posters[0].user_id);
	const tags = tagsFormatter(post.category_id);

	const content = post.excerpt;

	return {
		content,
		tags,
		id: post.id,
		title: post.title,
		date: post.created_at,
		name: poster.name || poster.username,
		authorImageUrl: poster.userImageUrl,
		category: '山姆哥',
		numLikes: post.like_count,
		numComments: post.posts_count + post.reply_count,
		isReaderMode: false,
	};
}

/**
 * Format array of posts from API data for rendering, sort based on update time
 * @param {array} posts - Array of Posts
 * @returns {array} Formatted mintPosts array
 */
exports.postsFormatter = async function postsFormatter(posts) {
	return Promise.all(posts.map(post => postFormatter(post))).then(mappedPosts =>
		mappedPosts.sort((a, b) => b.date - a.date)
	);
};
