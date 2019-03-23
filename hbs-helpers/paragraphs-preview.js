const hbs = require('hbs');

const SHOULD_PREVIEW = 200;
const PREVIEW_LENGTH = 150;

hbs.registerHelper('paragraphsPreview', paragraphs => {
	return paragraphs.length > SHOULD_PREVIEW
		? `${paragraphs.substring(0, PREVIEW_LENGTH)}...`
		: paragraphs;
});
