'use strict';

// Requirements ES5 style
var gulp = require('gulp');

// Lazy load any plugin specified in devDependencies
var gulpLoadPlugins = require('gulp-load-plugins');

// In order to sync the browser with our workflow
var browserSync = require('browser-sync');
var del = require('del');


var plugin = gulpLoadPlugins();
var reload = browserSync.reload;

// Define task to manipulate  styles
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
        .pipe(gulp.dest('dist/styles'))
        .pipe(reload({stream: true}));
});

// Define task to manipulate scripts
gulp.task('scripts', function() {
    return gulp.src('dev/scripts/**/*.js')
        .pipe(plugin.plumber())
        .pipe(plugin.sourcemaps.init())
        .pipe(plugin.sourcemaps.write('.'))
        .pipe(gulp.dest('.tmp/scripts'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(reload({stream: true}));
});

// Define task to manipulate images
gulp.task('images', function() {
  return gulp.src('dev/images/**/*')
    .on('error', function (err) {
      console.log(err);
      this.end();
    })
    .pipe(gulp.dest('dist/images'));
});

// Define task to manipulate  Html when building
gulp.task('html', ['styles', 'scripts'], function() {
    return gulp.src('dev/*.html')
        .pipe(plugin.useref({searchPath: ['.tmp', 'dev', '.']}))
        .pipe(plugin.if('*.js', plugin.uglify()))
        .pipe(plugin.if('*.css', plugin.cssnano()))
        .pipe(plugin.if('*.html', plugin.htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('dist'));
});

// Define function to make lint works
function lint(files, options) {
    return function() {
        return gulp.src(files)
            .pipe(reload({stream: true, once: true}))
            .pipe(plugin.eslint(options))
            .pipe(plugin.eslint({
                globals: {
                    'jQuery': true
                }
            }))
            .pipe(plugin.eslint.format())
            .pipe(plugin.if(!browserSync.active, plugin.eslint.failAfterError()));
    };
}

// Define task lint to lint out js files
gulp.task('lint', lint('dev/scripts/**/*.js'));

// Define task Clean remove build and .tmp
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

gulp.task('build', ['lint', 'html', 'styles', 'scripts', 'images'], function() {
    return gulp.src('dist/**/*').pipe(plugin.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});