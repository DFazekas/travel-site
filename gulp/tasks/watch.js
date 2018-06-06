var gulp = require('gulp'),
        watch = require("gulp-watch"),
        browserSync = require("browser-sync").create();

gulp.task("watch", function () {
    // Refresh browser automatically when saving files.
    browserSync.init({
        // Hide sync notification.
        notify: false,
        // Sets up server in App directory.
        server: {
            baseDir: "app"
        }
    });

    // Trigger when file changes occur on index.html.
    watch('./app/index.html', function () {
        // Refresh the browser.
        browserSync.reload();
    });
    
    // Trigger when file changes occur within Styles directory.
    watch("./app/assets/styles/**/*.css", function () {
        // Any time a change is saved to a CSS file trigger the cssInject Task.
        gulp.start("cssInject");
    });
    
    // Trigger when file changes occur with the Scripts directory.
    watch("./app/assets/scripts/**/*.js", function() {
        // Any time a change is saved to a JS file trigger the Webpack scripts task and refresh the browser.
        gulp.start("scriptsRefresh");
    });
});

gulp.task("cssInject", ["styles"], function () {
    // Before starting the below code, run the array of dependencies above.
    // Inject the latest CSS without forcing a refresh.
    return gulp.src("./app/temp/styles/styles.css")
            .pipe(browserSync.stream());
});

gulp.task("scriptsRefresh", ["scripts"], function() {
    /* Refresh browser when a JS file has been changed. */
    browserSync.reload();
});