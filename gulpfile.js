const { src, dest } = require('gulp');

const sass = require('gulp-sass');
const minify = require('gulp-cssnano');

function build() {
	return src([
		'public/assets/sass/404.scss',
		'public/assets/sass/error.scss',
		'public/assets/sass/main.scss',
	])
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
		.pipe(dest('public/assets/sass/output'));
}

exports.default = build;
