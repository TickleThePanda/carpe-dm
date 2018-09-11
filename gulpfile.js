const gulp = require('gulp');
const less = require('gulp-less');
const shell = require('gulp-shell');

gulp.task('css', () => {
  return gulp.src('src/style/**/[^_]*.less')
         .pipe(less())
         .pipe(gulp.dest('_site/style/'));
});

gulp.task('generate', shell.task('eleventy'));

gulp.task('assets', gulp.parallel('css'));

gulp.task('build', gulp.series('generate', 'assets'));

gulp.task('watch', () => {
  gulp.watch('src/**/*.{md,html,njk}', gulp.series('generate'));
  gulp.watch('src/style/**/*.less', gulp.series('css'));
});

