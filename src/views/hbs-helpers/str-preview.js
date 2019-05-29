/**
 * @module test/views/hbs-helpers/str-preview
 */
const hbs = require('hbs');

const PREVIEW_CHAR_LENGTH = 150;

/**
 * Get a preview string based on content string that passed in
 * @param {string} content
 * @param {object} option
 * @param {object} option.hash
 * @param {number} option.hash.previewLength - length of preview string
 */
function strPreview(content, { hash = {} } = {}) {
	const { previewLength = PREVIEW_CHAR_LENGTH } = hash;
	const shouldPreview = content.length > previewLength;
	return shouldPreview ? `${content.substring(0, previewLength)}...` : content;
}

hbs.registerHelper('strPreview', strPreview);

exports.strPreview = strPreview;
