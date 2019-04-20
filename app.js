const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const hbs = require('hbs');

require('./setup-global')();

hbs.registerPartials(path.join(__dirname, 'views/templates/partials'));
include('views/hbs-helpers');

const indexRouter = include('routes/index');
const singlePostRouter = include('routes/single-post');

module.exports = (app = express()) => {
	app.set('views', path.join(__dirname, 'views/templates'));
	app.set('view engine', 'hbs');

	app.use(logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(
		sassMiddleware({
			src: path.join(__dirname, 'public'),
			dest: path.join(__dirname, 'public'),
			indentedSyntax: false, // true = .sass and false = .scss
			sourceMap: true,
		})
	);
	app.use(express.static(path.join(__dirname, 'public')));

	app.use('/', indexRouter());
	app.use('/single-post', singlePostRouter());

	// catch 404 and forward to error handler
	app.use((req, res, next) => {
		next(createError(404));
	});

	// error handler
	// eslint-disable-next-line no-unused-vars
	app.use((err, req, res, next) => {
		// NODE_ENV is an environment variable popularized by the Express framework.
		// by default, the value is development
		const isProd = process.env.NODE_ENV === 'production';

		// only providing error in development
		const error = isProd ? {} : err;

		res.status(err.status || 500);

		if (err.status === 404) {
			res.render('404', {
				layout: '404Layout',
			});
		} else {
			res.render('error', {
				error,
				isProd,
				layout: 'errorLayout',
			});
		}
	});

	return app;
};
