var gulp       = require('gulp');
var ts         = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var webserver = require('gulp-webserver');

// supposed to honor the tsconfig file
// does not do the source maps
var tsProject  = ts.createProject('tsconfig.json');

gulp.task('compile', function() {
  // builds into the build folder from the tsconfig.json file
  var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.'));
});

// server some static files
gulp.task('webserver', function() {

  return gulp.src('.')
    .pipe(webserver({
      livereload: true,
      fallback: 'index.html',
      directoryListing: {
        enable: true,
        default: 'build'
      },
      open: true
    }));
});


gulp.task('copy_index', function () {
  return gulp
    .src('index.html')
    .pipe(gulp.dest('build'));
});

gulp.task('copy_src', function () {
  return gulp
    .src('src/d3/d3.js')
    .pipe(gulp.dest('build/js'));
});

gulp.task('copy_css', function () {
  return gulp
    .src('src/css/experiment.css')
    .pipe(gulp.dest('build/css'));
});


gulp.task('watch', ['compile'], function() {
  gulp.watch('./src/**/*.ts', ['compile']);
  gulp.watch('index.html', ['copy_index']);
  gulp.watch('src/css/*', ['copy_css']);
});

gulp.task('default', ['build', 'webserver', 'watch']);
gulp.task('build', ['copy_index', 'copy_css', 'copy_src', 'compile']);
