const { src, dest, series } = require('gulp');

const gulpClean = require('gulp-clean');
const sass = require('gulp-sass');
const minify = require('gulp-cssnano');
const md5 = require('gulp-md5-plus');

function clean() {
	return src('public/assets/sass/output').pipe(gulpClean());
}

function build() {
	return src('public/assets/sass/*.scss')
		.pipe(
			sass({
				outputStyle: 'expanded',
				sourceComments: true,
			})
		)
		.pipe(
			minify({
				discardComments: {
					removeAll: true,
				},
			})
		)
		.pipe(md5(10, 'views/templates/layout/*.hbs'))
		.pipe(dest('public/assets/sass/output'));
}

exports.default = series(clean, build);
