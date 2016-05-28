'use strict';

// Requirements ES5 style
var gulp = require('gulp');

// Lazy load any plugin specified in devDependencies
var gulpLoadPlugins = require('gulp-load-plugins');

// In order to sync the browser with our workflow
var browserSync = require('browser-sync');

//
var wiredep = require('wiredep');
var del = require('del');


var plugin = gulpLoadPlugins();
var reload = browserSync.reload;

gulp.task('styles', function() {
    return gulp.src('dev/styles/*.scss')
        .pipe(plugin.plumber())
        .pipe(plugin.sourcemaps.init())
        .pipe(plugin.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', plugin.sass.logError))
        .pipe(plugin.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
        .pipe(plugin.sourcemaps.write())
        .pipe(gulp.dest('.tmp/styles'))
        .pipe(reload({stream: true}));
});

gulp.task('scripts', function() {
    return gulp.src('dev/scripts/**/*.js')
        .pipe(plugin.plumber())
        .pipe(plugin.sourcemaps.init())
        .pipe(plugin.sourcemaps.write('.'))
        .pipe(gulp.dest('.tmp/scripts'))
        .pipe(reload({stream: true}));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'scripts'], function() {
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['.tmp', 'dev'],
            routes: {
                '/bower_components': 'bower_components'
            }
        }
    });

    gulp.watch([
        'dev/*.html',
        '.tmp/scripts/**/*.js',
        'dev/images/**/*'
    ]).on('change', reload);

    gulp.watch('dev/styles/**/*.scss', ['styles']);
    gulp.watch('dev/scripts/**/*.js', ['scripts']);
});

gulp.task('build', ['lint', 'html'], function() {
    return gulp.src('dist/**/*').pipe(plugin.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});