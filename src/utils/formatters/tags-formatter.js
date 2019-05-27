/**
 * @module utils/formatters/tags-formatter
 */

const { categories } = require('../../utils/config');

/**
 * Get tags infor based on categoryId
 * @param {string} categoryId - category_id from API
 * @returns {array} tags list
 */
exports.tagsFormatter = function tagsFormatter(categoryId) {
	const tags = categories[categoryId];
	// The special 'pin' tag is dynamically add to post's tag array,
	// need to clone it before return, because pram is passed by reference.
	return Array.isArray(tags) ? [...tags] : [];
};
