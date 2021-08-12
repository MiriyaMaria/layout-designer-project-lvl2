const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const cssnano = require('gulp-cssnano');
const browserSync = require('browser-sync').create();
const del = require('del');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');


const clear = (cb) => {
  return del([
    './build'
  ])
}

const scss = (cb) => {
  return gulp.src('./src/scss/app.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream())
}

const html = (cb) => {
  return gulp.src('./src/*.html')
    .pipe(gulp.dest('./build'))
}

const fonts = (cb) => {
  return gulp.src('./src/fonts/*.ttf')
    .pipe(gulp.dest('./build/fonts'))
}

const images = (cb) => {
  return gulp.src('./src/images/*.{png,svg,jpg,jpeg}')
    .pipe(imagemin([
      imageminPngquant({quality: [0.6, 0.8]})
    ]))
    .pipe(gulp.dest('./build/images'))
}

const scssTest = (cb) => {
  return gulp.src('./src/scss/app.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./src/css'))
}

const local = (cb) => {
  browserSync.init({
    open: false,
    server: {
      baseDir: "./build"
    }
  });

  gulp.watch('./src/scss/*.scss', scss);
  gulp.watch('./src/*.html', html);
  gulp.watch('./build/*.html').on('change', browserSync.reload);
  gulp.watch('./src/images/*.{png,svg,jpg,jpeg}', images);
}


exports.local = gulp.series(
  clear,
  scss,
  html,
  images,
  fonts,
  local
)

exports.scss = scssTest;
