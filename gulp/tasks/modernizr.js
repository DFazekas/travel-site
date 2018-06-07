/* Gulp-Modernizer lets us build our own custom copy of Modernizer to test only
 * for the features we care about. */
var gulp = require('gulp'),
    modernizr = require('gulp-modernizr');

gulp.task('modernizr', function() {
    /* Search through all CSS and JS files within the assets directory. */
    return gulp.src(['./app/assets/styles/**/*.css', './app/assets/scripts/**/*.js'])
            /* Append classes that reflect browser supported features. */
            .pipe(modernizr({
                "options": [
                    "setClasses"
                ]
            }))
            .pipe(gulp.dest('./app/temp/scripts/'));
});

