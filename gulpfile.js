var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');


var paths = {
  sass: [
    './scss/**/*.scss',
    './node_modules/angular-material/angular-material.scss'
  ],
  scripts: [
    './scripts/*.js',
    './scripts/**/*.js',
    './scripts/**/*.*.js'
  ],
  libs: [
    './node_modules/angular/angular.js',
    './node_modules/angular-aria/angular-aria.js',
    './node_modules/angular-messages/angular-messages.js',
    './node_modules/angular-animate/angular-animate.js',
    './node_modules/angular-material/angular-material.js',
    './node_modules/angular-ui-router/release/angular-ui-router.js'
  ]
};

gulp.task('default', ['sass', 'scripts', 'libs']);

gulp.task('sass', function(done) {
  gulp.src('./scss/app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./app/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./app/css/'))
    .on('end', done);
});

gulp.task('scripts', function(done) {
  gulp.src(paths.scripts)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./app/js/'))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./app/js/'))
    .on('end', done);
});

gulp.task('libs', function(done) {
  gulp.src(paths.libs)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('./app/js/'))
    .pipe(rename('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./app/js/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.libs, ['libs']);
});
