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
	return categories[categoryId];
};
