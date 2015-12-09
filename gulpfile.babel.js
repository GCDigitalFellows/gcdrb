'use strict';

import gulp from 'gulp';
// Loads the plugins without having to list all of them, but you need
// to call them as $.pluginname
import gulpLoadPlugins from 'gulp-load-plugins';
var $ = gulpLoadPlugins();
var streamSeries = require('stream-series');
var request = require('request');
var babyparse = require('babyparse');
var yaml = require('js-yaml');
var fs = require('fs');

// Delete stuff
import del from 'del';
// Used to run shell commands
import shell from 'shelljs';
// BrowserSync is used to live-reload your website
import browserSync from 'browser-sync';
// AutoPrefixer
import autoprefixer from 'autoprefixer';
// Yargs for command line arguments
import {argv} from 'yargs';

var isProduction = (argv._.indexOf('deploy') > -1 ? true : argv.prod);

var clean = require('./gulp-tasks/clean')(gulp, del);
gulp.task('clean', clean.cleanall);
gulp.task('clean:assets', clean.assets);
gulp.task('clean:dist', clean.dist);
gulp.task('clean:gzip', clean.gzip);
gulp.task('clean:metadata', clean.metadata);
gulp.task('data', require('./gulp-tasks/data')(request, babyparse, yaml, fs));
var deploy = require('./gulp-tasks/deploy')(gulp);
gulp.task('deploy:cname', deploy.cname);
gulp.task('deploy:push', deploy.push);
gulp.task('deploy', deploy.deploy);
gulp.task('fonts', require('./gulp-tasks/fonts')(gulp, $));
gulp.task('html', require('./gulp-tasks/html')(gulp, $, isProduction));
gulp.task('images', require('./gulp-tasks/images')(gulp, $));
var inject = require('./gulp-tasks/inject')(gulp, $, streamSeries);
gulp.task('inject:head', inject.head);
gulp.task('inject:footer', inject.footer);
gulp.task('jekyll', require('./gulp-tasks/jekyll')(gulp, shell, isProduction));
gulp.task('rebuild', require('./gulp-tasks/rebuild')(gulp));
var scripts = require('./gulp-tasks/scripts')(gulp, $, isProduction, browserSync);
gulp.task('scripts', scripts.scripts);
gulp.task('scripts:vendor', scripts.vendor);
gulp.task('serve', require('./gulp-tasks/serve')(gulp, $, browserSync));
var styles = require('./gulp-tasks/styles')(gulp, $, isProduction, browserSync, autoprefixer);
gulp.task('styles', styles.styles);
gulp.task('styles:vendor', styles.vendor);

// 'gulp doctor' -- literally just runs jekyll doctor
gulp.task('jekyll:doctor', done => {
  shell.exec('jekyll doctor');
  done();
});

// 'gulp lint' -- check your JS for formatting errors using XO Space
gulp.task('lint', () =>
gulp.src([
  'gulpfile.babel.js',
  '.tmp/assets/javascript/*.js',
  '!.tmp/assets/javascript/*.min.js'
])
.pipe($.eslint())
.pipe($.eslint.formatEach())
.pipe($.eslint.failOnError())
);

// 'gulp assets' -- cleans out your assets and rebuilds them
// 'gulp assets --prod' -- cleans out your assets and rebuilds them with
// production settings
gulp.task('assets', gulp.series(
  gulp.series('clean:assets'),
  gulp.parallel('styles:vendor', 'styles', 'scripts:vendor', 'scripts', 'fonts', 'images', 'data')
));

// 'gulp assets:copy' -- copes the assets into the dist folder, needs to be
// done this way because Jekyll overwrites the whole folder otherwise
gulp.task('assets:copy', () =>
gulp.src('.tmp/assets/**/*')
.pipe(gulp.dest('dist/assets'))
);

// 'gulp build' -- same as 'gulp' but doesn't serve your site in your browser
// 'gulp build --prod' -- same as above but with production settings
gulp.task('build', gulp.series(
  gulp.series('clean:assets', 'clean:gzip'),
  gulp.series('assets', 'inject:head', 'inject:footer'),
  gulp.series('jekyll', 'assets:copy', 'html')
));

// 'gulp deploy:cname' -- writes CNAME file to dist folder
gulp.task('deploy:cname', () =>
gulp.src([
  'src/CNAME'
])
.pipe(gulp.dest('dist'))
);

// 'gulp deploy:push' -- pushes your dist folder to Github
gulp.task('deploy:push', () => {
  return gulp.src('dist/**/*')
  .pipe($.ghPages({
    branch: 'master',
    remoteUrl: 'git@github.com:GCDigitalFellows/gcdigitalfellows.github.io.git'
  }));
});

// 'gulp deploy' -- copies CNAME and pushes to github
gulp.task('deploy', gulp.series(
  'build',
  // 'deploy:cname',
  'deploy:push'
));

// 'gulp' -- cleans your assets and gzipped files, creates your assets and
// injects them into the templates, then builds your site, copied the assets
// into their directory and serves the site
// 'gulp --prod' -- same as above but with production settings
gulp.task('default', gulp.series(
  gulp.series('clean:assets', 'clean:gzip'),
  gulp.series('assets', 'inject:head', 'inject:footer'),
  gulp.series('jekyll', 'assets:copy', 'html'),
  gulp.series('serve')
));

// 'gulp check' -- checks your Jekyll configuration for errors and lint your JS
gulp.task('check', gulp.series('jekyll:doctor', 'lint'));
