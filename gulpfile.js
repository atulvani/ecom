var gulp = require('gulp'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-csso'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    del = require('del'),
    templateCache = require('gulp-angular-templatecache'),
    uglify = require('gulp-uglify'),
    htmlSrc = ['./app/js/directives/**/*.html', './app/js/components/**/*.html', './app/js/common/templates/*.html'],
    jsSrc = [
        './node_modules/jquery/dist/jquery.js',
        './node_modules/angular/angular.js',
        './node_modules/angular-route/angular-route.js',
        './node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
        './node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
        './node_modules/angular-mocks/angular-mocks.js',
        './app/js/tpl/json-schema-faker.js',
        './app/js/tpl/angular-jsf.js',
        './app/js/tpl/lodash.js',
        './app/js/app.js',
        './app/js/services/**/*.js',
        './app/js/directives/**/*.js',
        './app/js/components/**/*.js',
        './app/dist/templates.js',
    ],
    cssSrc = ['./app/less/styles.less'];

gulp.task('html', function () {
    return gulp.src(htmlSrc)
        .pipe(templateCache({standalone: true}))
        .pipe(gulp.dest('./app/dist'));
});

gulp.task('js', function() {
    del.sync(['./app/js/scripts.js']);
    return gulp.src(jsSrc)
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./app/dist/'));
});

gulp.task('css', function() {
    del.sync(['./app/css/styles.css']);
    return gulp.src(cssSrc)
        .pipe(less())
        .pipe(autoprefixer({browsers: ['last 2 versions'], cascade: false}))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./app/dist/'));
});

gulp.task('default', ['html', 'js', 'css'], function () {
    gulp.watch(htmlSrc, ['html']);
    gulp.watch(jsSrc, ['js']);
    gulp.watch(cssSrc, ['css']);
});
