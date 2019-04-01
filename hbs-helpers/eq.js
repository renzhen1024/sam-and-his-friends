const hbs = require('hbs');

hbs.registerHelper('eq', (num, cmp, val) => (num === cmp ? val : ''));
