/**
 * @module utils/formatters/single-post-formatter
 */
const { JSDOM } = require('jsdom');
const Readability = require('readability');

const { getActiveUserFromCache } = require('../../data/cache/active-users');
const {
	addPostToCache,
	getPostFromCache,
} = require('../../data/cache/single-post');
const {
	commentsFormatter,
} = require('../../utils/formatters/comments-formatter');
const { tagsFormatter } = require('../../utils/formatters/tags-formatter');
const { metaDescription, siteTitle, username } = require('../../utils/config');

function getJsdom(cooked = '') {
	return new JSDOM(`<!DOCTYPE html>${cooked}`);
}

function getImages(jsdom) {
	const imgElements = jsdom.window.document.querySelectorAll('img');
	return Array.from(imgElements).map(imgElement => ({
		srcStr: imgElement.getAttribute('src'),
		altStr: imgElement.getAttribute('alt') || '',
	}));
}

function getExcerpt(jsdom) {
	const article = new Readability(jsdom.window.document).parse();
	const { textContent, excerpt } = article;
	// Readability.js return first p as excerpt
	const extractedContent =
		excerpt && excerpt.startsWith('摘要') ? excerpt : textContent;
	return `${extractedContent.slice(0, 150)}...`;
}

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
	const comments = await commentsFormatter(postData.post_stream.posts.slice(1));
	const tags = tagsFormatter(postData.category_id);
	const post = postData.post_stream.posts[0];
	const cachedPost = await getPostFromCache(postData.id);

	// Only create JSDOM if the post is not in cache
	if (!cachedPost) {
		const jsdom = getJsdom(post.cooked);

		// Notice: getImages() has to be called before getExcerpt(). Because new Readability().parse() modify jsdom object
		Object.assign(post, {
			heroImage: getImages(jsdom)[0],
			excerpt: getExcerpt(jsdom),
		});

		addPostToCache(post);
	}

	return {
		tags,
		title,
		siteTitle: `${siteTitle} | ${title}`,
		views,
		numLikes,
		numComments,
		comments,
		isPosterSiteOwner,
		metaDescription,
		name: poster.name || poster.username,
		excerpt: post.excerpt,
		content: post.cooked,
		date: post.updated_at,
		reads: post.reads,
		heroImage: cachedPost.heroImage || post.heroImage,
		authorImageUrl: poster.userImageUrl,
		userProfileUrl: poster.userProfileUrl,
	};
};
