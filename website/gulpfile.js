var gulp = require('gulp');
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;


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

// browser-sync task for starting the server.
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

// Sass task, will run when any SCSS files change & BrowserSync
// will auto-update browsers
gulp.task('sass', function () {
    return gulp.src('scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(reload({stream:true}));
});

// Default task to be run with `gulp`
gulp.task('default', ['watch', 'browser-sync'], function () {
    gulp.watch("scss/*.scss", ['sass']);
});