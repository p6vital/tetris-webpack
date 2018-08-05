const gulp = require('gulp');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const del = require('del');

gulp.task('default', () => gulp.src('src/client/js/index.jsx')
    .pipe(gulpWebpack(require('./webpack.config.js'), webpack))
    .pipe(gulp.dest('dist/')));

gulp.task('clean', () => del(['dist/**'], { force: true }));
