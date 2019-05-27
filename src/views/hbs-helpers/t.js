const hbs = require('hbs');
const Polyglot = require('node-polyglot');

const locale = require('../../locale/zh-cn');

const polyglot = new Polyglot();

polyglot.extend(locale);

hbs.registerHelper('t', (str, { hash }) => {
	return polyglot.t(str, hash);
});
