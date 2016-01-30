var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var concat = require("gulp-concat");
var less = require('gulp-less');
var react = require('gulp-react');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglifyjs');
var STATIC = 'app/static'


var LIBS_SCRIPTS = [
    'front_end/bower_components/jquery/dist/jquery.js',
    'front_end/bower_components/jquery.cookie/jquery.cookie.js',
    'front_end/bower_components/bootstrap/dist/js/bootstrap.js',
];

var LIBS_CSS = [
    'front_end/bower_components/font-awesome/css/font-awesome.css',
    'front_end/bower_components/bootstrap/dist/css/bootstrap.css',
];

var LIBS_FONTS = [
    'front_end/bower_components/font-awesome/fonts/**.*',
    'front_end/bower_components/bootstrap/fonts/**.*',
    'front_end/fonts/*/**.*'
];

gulp.task("fonts", function () {
  return gulp.src(LIBS_FONTS)
    .pipe(gulp.dest(STATIC + '/dev/fonts'));
});

gulp.task("lib-css", function () {
  return gulp.src(LIBS_CSS)
    .pipe(gulp.dest(STATIC + '/dev/css'));
});

gulp.task("lib-js", function () {
  return gulp.src(LIBS_SCRIPTS)
    .pipe(gulp.dest(STATIC + '/dev/js'));
});

gulp.task("js", function () {
  return gulp.src("./front_end/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(concat("app.js"))
    .pipe(react())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(STATIC + '/dev/js'));
});

gulp.task("img", function () {
  return gulp.src("./front_end/img/*")
    .pipe(gulp.dest(STATIC + '/img'));
});

gulp.task("less", function () {
  return gulp.src('./front_end/less/**/*.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(STATIC + '/dev/css'));
});

gulp.task('minify-css', function() {
  return gulp.src(STATIC +'/dev/css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest(STATIC + '/dist'));
});

gulp.task('minify-jslibs', function() {
  return gulp.src(LIBS_SCRIPTS)
    .pipe(uglify())
    .pipe(concat('libs.min.js'))
    .pipe(gulp.dest(STATIC + '/dist'));
});

gulp.task('minify-js', function() {
  return gulp.src(STATIC +'/dev/js/app.js')
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest(STATIC + '/dist'));
});

gulp.task("default", ["js", "less", "img", "fonts", "lib-css", "lib-js"]);

gulp.task('watch', function() {
  gulp.watch('./front_end/less/**/*.less', ['less']);
  gulp.watch('./front_end/js/**/*.js', ['js']);
  gulp.watch('./front_end/img/*', ['img']);
  gulp.watch(LIBS_FONTS, ['fonts']);
  gulp.watch(LIBS_CSS, ['fonts']);
  gulp.watch(LIBS_SCRIPTS, ['fonts']);
});
