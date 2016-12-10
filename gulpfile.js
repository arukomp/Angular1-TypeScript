var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();

// settings
var minifyFiles = false;

gulp.task('default', ['build']);

gulp.task('build', function(callback) {
    runSequence('clean:dist', 'sass', 'useref', callback);
})

gulp.task('build:min', function(callback) {
    minifyFiles = true;
    runSequence('build', callback);
})

gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.+(scss|sass)')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('watch', ['build', 'browserSync'], function() {
    // gulp.watch('app/scss/**/*.+(scss|sass)', ['sass']);
    gulp.watch('app/**/*.*', ['build']);
    gulp.watch('dist/*.html', browserSync.reload);
    gulp.watch('dist/**/*.+(js|css)', browserSync.reload);
    // add more watch tasks here
});

gulp.task('browserSync', function() {
    return browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });
});

gulp.task('useref', function() {
    console.log('Concatenating and minifying JS and CSS files...');
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf(minifyFiles && '*.js', uglify()))
        .pipe(gulpIf(minifyFiles && '*.css', cssnano()))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean:dist', function() {
    return del.sync('dist');
});