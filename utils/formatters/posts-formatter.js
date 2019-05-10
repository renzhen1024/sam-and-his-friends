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

	let content = topic.excerpt;
	const cachedPost = await getPostFromCache(topic.id);
	if (content) {
		// If topic.excerpt exists, then this topic is pinned in renzhen1024
		tags.unshift({ name: '置顶', color: '#00E6E6' });
	} else {
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
		isPinned: !!topic.excerpt,
		images: cachedPost.images,
		imageClasses: cachedPost.imageClasses,
	};
}

/**
 * Format array of posts from API data for rendering, sort based on update time
 * @param {array} posts - Array of Posts
 * @returns {array} Formatted mintPosts array
 */
exports.postsFormatter = async function postsFormatter(posts) {
	return Promise.all(posts.map(post => postFormatter(post))).then(mappedPosts =>
		mappedPosts
			.sort((a, b) => b.date - a.date)
			.sort((a, b) => {
				if (a.isPinned && !b.isPinned) {
					return -1;
				}

				if (!a.isPinned && b.isPinned) {
					return 1;
				}

				return 0;
			})
	);
};
