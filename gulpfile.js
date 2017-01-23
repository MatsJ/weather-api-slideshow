var gulp = require('gulp'),
  connect = require('gulp-connect'),
  browserSync = require('browser-sync');

gulp.task('connect', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./public/*.html')
    .pipe(connect.reload());
});

gulp.task('css', function () {
  gulp.src('./public/*.css')
    .pipe(connect.reload())
    .pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'public'
    },
  });
});

//task that watches the other tasks
gulp.task('watch', ['browserSync', 'css', 'html'], function() {
  gulp.watch('public/*.css', ['css']);
  gulp.watch('public/*.html', browserSync.reload);
});

//gulp in terminal runs localhost, watches changes in the html, css and updates through browsersync
gulp.task('default', ['connect', 'watch']);
