const browserSync = require('browser-sync');
const gulp = require('gulp');
const pug = require('gulp-pug');

const sass = require('gulp-sass');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

const paths = {
  root: './build',
  templates: {
    pages: 'src/templates/pages/*.pug',
    src: 'src/templates/**/*.pug',
    dest: 'build/assets/'
  },
  styles: {
    src: 'src/styles/**/*.scss',
    dest: 'build/assets/styles'
  },
  images: {
    src: 'src/images/**/*.*',
    dest: 'build/assets/images'
  },

} 

function templates() {
  return gulp.src(paths.templates.pages)
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(paths.root))
}

function watch() {
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.templates.src, templates);
  
}

function styles() {
  return gulp.src('./src/styles/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(sourcemaps.write())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.styles.dest))
}

function server() {
  browserSync.init({
    server: paths.root
  });
  browserSync.watch(paths.root + '/**//**.*', browserSync.reload);


}

exports.templates = templates;
exports.styles = styles;

gulp.task('default', gulp.series(
  gulp.parallel(styles, templates),
  gulp.parallel(watch, server)
));

