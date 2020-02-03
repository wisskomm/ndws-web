// Sass configuration
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const prettier = require('gulp-prettier');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

var ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

gulp.task('typescript', function () {
  return tsProject.src()
      .pipe(tsProject())
      .js.pipe(gulp.dest('dist/js'));
});

gulp.task('sass', function(cb) {
  gulp
    // Process CSS File
    .src('src/style/combined.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(prettier({ singleQuote: true }))
    .pipe(rename({ basename: 'ndws' }))
    // Create full CSS file
    .pipe(
      gulp.dest("dist/css")
    )
    // Process and create minified css file
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'));

    browserSync.reload();
  cb();
});

gulp.task(
  'default',
  gulp.series('sass', function(cb) {
    browserSync.init({
      server: {
        baseDir: "./dist"
      }
    });

    gulp.watch('src/style/*.scss', gulp.series('sass', 'typescript'));
    gulp.watch('dist/index.html', gulp.series('sass', 'typescript'));
  })
);