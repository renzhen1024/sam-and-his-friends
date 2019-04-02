const hbs = require('hbs');
const moment = require('moment');

moment.locale('zh-cn');

hbs.registerHelper('dateFormatter', date => moment(date).format('LL'));
