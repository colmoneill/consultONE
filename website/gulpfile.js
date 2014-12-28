var gulp = require('gulp');
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');

gulp.task('compass', function() {
    gulp.src('./assets/css/*.scss')
        .pipe(compass({
            config_file: './compass/config.rb',
            sass: 'assets/css',
            css: 'assets/css',
        }))
        .on('error', function(err) {
            console.log(err)
        })
        .pipe(minifyCSS())
        .pipe(gulp.dest('./assets/css/'));
});
gulp.task('watch', function () {
    gulp.watch(['./assets/css/**/*.scss'], ['compass']);
});

gulp.task('default', ['compass', 'watch']);