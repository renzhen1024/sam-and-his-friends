/**
 * @module utils/formatters/posts-formatter
 */

const { getActiveUserFromCache } = require('../../data/cache/active-users');
const { getPostFromCache } = require('../../data/cache/single-post');
const { tagsFormatter } = require('../../utils/formatters/tags-formatter');
/**
 * Format post from API data for rendering
 * @param {object} post - Data from API
 * @returns {object} Formatted post
 */
async function postFormatter(topic) {
	// The first poster is the topic author
	const poster = await getActiveUserFromCache(topic.posters[0].user_id);
	const tags = tagsFormatter(topic.category_id);

	// TODO: if get from excerpt returns from API, add pin-top tag
	let content = topic.excerpt;
	if (!content) {
		const cachedPost = await getPostFromCache(topic.id);
		content = cachedPost && cachedPost.excerpt;
	}

	return {
		content,
		tags,
		id: topic.id,
		title: topic.title,
		date: topic.created_at,
		name: poster.name || poster.username,
		authorImageUrl: poster.userImageUrl,
		category: '山姆哥',
		numLikes: topic.like_count,
		numComments: topic.posts_count + topic.reply_count,
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
