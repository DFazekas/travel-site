/* Build will trigger all the necessary tasks to produce distributive-ready source code. */
var gulp = require("gulp"),
    imagemin = require('gulp-imagemin'),
    del = require("del"),
    usemin = require("gulp-usemin"),
    rev = require("gulp-rev"),
    cssnano = require("gulp-cssnano"),
    uglify = require("gulp-uglify"),
    browserSync = require("browser-sync").create();
    
/**/
gulp.task('previewDist', ["usemin"], function() {
    // Refresh browser automatically when saving files.
    browserSync.init({
        // Hide sync notification.
        notify: false,
        // Sets up server in App directory.
        server: {
            baseDir: "docs"
        }
    });
});

/* Delete the existing dist direction to ensure no garbage remains after rebuilding. */
gulp.task('deleteDistFolder', ['icons'], function() {
    return del("./docs");
});

/* Copy general files into the dist directory. */
gulp.task('copyGeneralFiles', ["deleteDistFolder"], function() {
    var pathsToCopy = [
        './app/**/*',
        '!./app/index.html',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp',
        '!./app/temp/**'
    ];
    
    return gulp.src(pathsToCopy)
        .pipe(gulp.dest("./docs"));
});

/* Copy and compress all image files to our dist directory. */
gulp.task('optimizeImages', ["deleteDistFolder"], function() {
    /* Exclude the icons directory - users only need the sprites directory. */
    return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
            .pipe(imagemin({
                /* Optimize .jpg images even further. */
                progressive: true,
                /* This helps with .gif images. */
                interlaced: true,
                /* This helps with .svg images. */
                multipass: true
            }))
            .pipe(gulp.dest("./docs/assets/images"));
         
});

gulp.task("useminTrigger", ["deleteDistFolder"], function() {
    gulp.start("usemin");
});

/* Copy HTML and any referenced CSS and JS links, compress and revision them before pasting in the dist directory. 
 * Automatically run a fresh rebuild of our CSS, JS, it will regenerate our icon sprite, our custom modernizr file,
 * and it will move everything perfectly into place in the dist directory. */
gulp.task("usemin", ['styles', 'scripts'], function() {
    return gulp.src('./app/index.html')
            .pipe(usemin({
                /* Perform revision then compression on the CSS file. */
                css: [function() {return rev()}, function() {return cssnano()}],
                /* Perform revision then compression on the JS file. */
                js: [function() {return rev()}, function() {return uglify()}]
            }))
            .pipe(gulp.dest("./docs"));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles' , 'optimizeImages', "useminTrigger"]);

