// Sass configuration
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const prettier = require('gulp-prettier');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
var run = require('gulp-run-command').default;
const open = require('open');


gulp.task('typescript', function () {
  return tsProject.src()
      .pipe(tsProject())
      .js.pipe(gulp.dest('static/js'));
});

gulp.task('sass', function(cb) {
  gulp
    // Process CSS File
    .src('src/style/combined.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(prettier({ singleQuote: true }))
    .pipe(rename({ basename: 'ndws' }))
    // Create full CSS file
    .pipe(
      gulp.dest("static/css")
    )
    // Process and create minified css file
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('static/css'));

    browserSync.reload();
  cb();
});

/* Run Hugo, call async! */
function runHugo(cb) {
  
  cb();
}

/* Start Hugo and launch browser*/
gulp.task('hugo', function(cb) {
  console.log("hugoTask");
  run('hugo server -D')();
  
  (async () => {
    await open('http://localhost:1313');
  })();

});

/* Start watch tasks */
function startWatchTasks(cb) {
  gulp.watch('src/style/*.scss', gulp.series('sass'));
  gulp.watch('src/typescript/*.ts', gulp.series('typescript'));
  cb();
}

function runHugo(cb) {
  console.log("runHugo");
  gulp.series('hugo');
  cb();
}


gulp.task(
  'default',
  gulp.series('sass', 'typescript', gulp.parallel('hugo', startWatchTasks))

  // gulp.series('sass', 'hugo', function(cb) {
  //   // browserSync.init({
  //   //   server: {
  //   //     baseDir: "./dist"
  //   //   },
  //   //   open: "external"
  //   // });
  // })
);