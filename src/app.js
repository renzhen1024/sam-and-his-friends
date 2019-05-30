/**
 * @module src/app.js
 * Entry point of the source code
 * Init express app and mount middlewares
 */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const hbs = require('hbs');

hbs.registerPartials(path.join(__dirname, 'views/templates/partials'));
require('./views/hbs-helpers');

const { isPro } = require('./utils/isPro.js');
const { siteTitle } = require('./utils/config');
const indexRouter = require('./routes/index');
const singlePostRouter = require('./routes/single-post');

/**
 * Init express app
 * @param {object} app - express application
 * @returns app - express application with custom middlewares
 */
module.exports = (app = express()) => {
	app.set('views', path.join(__dirname, 'views/templates'));
	app.set('view engine', 'hbs');
	app.set('view options', { layout: 'layout-fingerprinted/default' });

	app.use(express.static(path.join(__dirname, '../output')));

	app.use('/', indexRouter());
	app.use('/single-post', singlePostRouter());

	// catch 404 and forward to error handler
	app.use((req, res, next) => {
		next(createError(404));
	});

	app.use(onError);

	return app;
};

// eslint-disable-next-line no-unused-vars
function onError(err, req, res, next) {
	const isProd = isPro();
	const error = isProd ? {} : err;

	res.status(err.status || 500);

	if (err.status === 404) {
		res.render('404', {
			siteTitle,
			layout: 'layout-fingerprinted/404',
		});
	} else {
		res.render('error', {
			error,
			isProd,
			siteTitle,
			layout: 'layout-fingerprinted/error',
		});
	}
}
