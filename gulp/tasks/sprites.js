/* Take all the individual icon files and stitch them together into one file. */
var gulp = require('gulp'),
    svgSprite = require('gulp-svg-sprite'),
    rename = require('gulp-rename'),
    del = require('del');

/* Generate CSS to ease usage of sprite on website. */
var config = {
    mode: {
        css: {
            /**/
            sprite: 'sprite.svg',
            
            /* Render out CSS. */
            render: {
                /* Use CSS instead of something like SASS. */
                css: {
                    /* Package with fill in blanks in this template file with info from each icon file. */
                    template: './gulp/templates/sprite.css'
                }
            }
        }
    }
};

gulp.task('beginClean', function() {
    /* Deletes existing sprites to make room for newly generated ones. */
    return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

gulp.task('createSprite', ['beginClean'], function() {
    /* Take all the svg icons, stitch them together and export to the temp folder. */
    return gulp.src('./app/assets/images/icons/**/*.svg')
            .pipe(svgSprite(config))
            .pipe(gulp.dest('./app/temp/sprite/'));
});

gulp.task('copySpriteGraphic', ['createSprite'], function() {
    return gulp.src('./app/temp/sprite/css/**/*.svg')
            .pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('copySpriteCSS', ['createSprite'], function() {
    /* Retrieve the auto-generated sprite CSS from the temp folder and move it with the other CSS files within the modules folder. */
    return gulp.src('./app/temp/sprite/css/*.css')
            .pipe(rename('_sprite.css'))
            .pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function() {
    /* Delete temp fold containing sprites which were moved to the assets folder. */
    return del('./app/temp/sprite'); 
});

gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);