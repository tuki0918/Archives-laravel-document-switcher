'use strict';

var gulp       = require('gulp');
var browserify = require('browserify');
var babelify   = require('babelify');
var source     = require('vinyl-source-stream');

gulp.task('build', function () {
  return browserify({
    entries: './src/js/app.jsx',
    extensions: ['.js', '.jsx'],
    debug: true
  })
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('src/dist'));
});

gulp.task('default', ['build']);