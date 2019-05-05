const hbs = require('hbs');

const SHOULD_PREVIEW = 150;

hbs.registerHelper('strPreview', (str, { hash = {} } = {}) => {
	const { previewLength = SHOULD_PREVIEW } = hash;
	const shouldPreview = str.length > previewLength;
	return shouldPreview ? `${str.substring(0, previewLength)}...` : str;
});
