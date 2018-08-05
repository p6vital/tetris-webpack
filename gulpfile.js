const gulp = require('gulp');
const gutil = require('gulp-util');
const gulpWebpack = require('webpack-stream');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const del = require('del');
const { exec } = require('child_process');
const webpackConfig = require('./webpack.config.js');

gulp.task('clean', () => del(['dist/**'], { force: true }));

gulp.task('webpack', ['clean'], () => gulp.src('src/client/js/index.jsx')
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(gulp.dest('dist/')));

gulp.task('server', ['webpack'], () => {
    const server = exec('node server.js');

    server.stdout.on('data', (data) => {
        gutil.log(data.trim());
    });

    server.stderr.on('data', (data) => {
        gutil.log(gutil.colors.red(data.trim()));
        gutil.beep();
    });
});

gulp.task('webpack-dev-server', () => {
    new WebpackDevServer(webpack(webpackConfig), {
        stats: {
            colors: true,
        },
    }).listen(8080, 'localhost', (err) => {
        if (err) throw new gutil.PluginError('webpack-dev-server', err);
        gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
    });
});

gulp.task('watch', () => {
    gulp.watch('/', ['webpack']);
});

gulp.task('dev-server', ['webpack-dev-server', 'watch', 'server']);

gulp.task('default', ['clean', 'webpack', 'server']);
