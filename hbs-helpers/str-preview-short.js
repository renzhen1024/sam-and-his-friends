const hbs = require('hbs');

const SHOULD_PREVIEW = 50;

hbs.registerHelper('strPreviewShort', str => {
	const shouldPreview = str.length > SHOULD_PREVIEW;
	return shouldPreview ? `${str.substring(0, SHOULD_PREVIEW)}...` : str;
});
