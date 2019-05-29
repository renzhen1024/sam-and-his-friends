/**
 * @module src/views/hbs-helpers/t
 * A helper with ramp the t method from node-polyglot
 */
const hbs = require('hbs');
const Polyglot = require('node-polyglot');

const { setting } = require('../../utils/config');
// eslint-disable-next-line import/no-dynamic-require
const locale = require(`../../locale/${setting.locale}`);

const polyglot = new Polyglot();
polyglot.extend(locale);

hbs.registerHelper('t', (str, { hash }) => {
	return polyglot.t(str, hash);
});
