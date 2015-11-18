var gulp       = require('gulp');
var ts         = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

// supposed to honor the tsconfig file
// does not do the source maps
var tsProject  = ts.createProject('tsconfig.json');

gulp.task('compile', function() {
  // builds into the buidl folder from the tsconfig.json file
  var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', ['compile'], function() {
  gulp.watch('./src/**/*.ts', ['compile']);
});

gulp.task('default', ['watch']);
