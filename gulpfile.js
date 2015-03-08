'use strict';
/* global require: false */
/* jshint node:true */

var gulp = require('gulp'),
	closureCompiler = require('gulp-closure-compiler'),
	sass = require('gulp-sass'),
	prefix = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps');

var config = require('./config.json');

gulp.task('scss', function () {
	gulp.src(config.src.scss + '/**/*.scss')
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(prefix(
			'last 2 version', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
		))
		.pipe(gulp.dest(config.build_dir + '/css'));
});

gulp.task('scss:dev', function () {
	gulp.src(config.src.scss + '/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'nested'}))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest(config.build_dir + '/css'));
});

gulp.task('js', function () {
	gulp.src(config.src.js + '/*.js')
		.pipe(closureCompiler({
			compilerPath: './lib/closure-compiler/compiler.jar',
			fileName: 'parallax.js'
		}))
		.pipe(gulp.dest(config.build_dir + '/js/'));
});

gulp.task('build', ['scss', 'js']);

gulp.task('default', ['scss:dev'], function () {
	gulp.watch(config.src.scss + '/**/*.scss', ['scss']);
});