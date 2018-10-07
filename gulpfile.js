const gulp = require('gulp');
const less = require('gulp-less');
const shell = require('gulp-shell');

gulp.task('css', () => {
  return gulp.src('src/style/**/[^_]*.less')
         .pipe(less())
         .pipe(gulp.dest('_site/style/'));
});

gulp.task('images', () => {
  return gulp.src('src/images/**/*.{png,jpg,jpeg}')
          .pipe(gulp.dest('_site/images/'));
})

gulp.task('generate', shell.task('eleventy'));

gulp.task('generate-dev', shell.task('eleventy', { ignoreErrors: true }));

gulp.task('assets', gulp.parallel('css', 'images'));

gulp.task('build', gulp.series('generate', 'assets'));

gulp.task('watch', () => {
  gulp.watch(
    ['.eleventy.js', 'src/**/*.{md,html,njk}'],
    gulp.series('generate-dev')
  );
  gulp.watch('src/style/**/*.less', gulp.series('css'));
  gulp.watch('src/images/**/*.{png,jpg,jpeg}', gulp.series('images'));
});

