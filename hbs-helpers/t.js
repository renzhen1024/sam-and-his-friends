const hbs = require('hbs');
const Polyglot = require('node-polyglot');

const locale = include('locale/zh-cn');

const polyglot = new Polyglot();

polyglot.extend(locale);

hbs.registerHelper('t', str => polyglot.t(str));
