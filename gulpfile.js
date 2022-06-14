const gulp = require("gulp");
const less = require("gulp-less");
const Eleventy = require("@11ty/eleventy");

gulp.task("css", () => {
  return gulp
    .src("src/style/**/[^_]*.less")
    .pipe(less())
    .pipe(gulp.dest("_site/style/"));
});

gulp.task("fonts", () => {
  return gulp.src("src/fonts/**/*.{otf,woff}").pipe(gulp.dest("_site/fonts/"));
});

gulp.task("images", () => {
  return gulp
    .src("src/images/**/*.{png,jpg,jpeg,svg}")
    .pipe(gulp.dest("_site/images/"));
});

gulp.task("redirects", () => {
  return gulp.src("src/_redirects").pipe(gulp.dest("_site"));
});

gulp.task("view", async () => {
  const elev = new Eleventy();
  await elev.write();
});

gulp.task("favicon", () => {
  return gulp.src("src/favicon/**/*").pipe(gulp.dest("_site"));
});

gulp.task(
  "build",
  gulp.parallel("view", "css", "images", "fonts", "favicon", "redirects")
);

gulp.task("watch", () => {
  gulp.watch("src/style/**/*.less", gulp.series("css"));
  gulp.watch("src/images/**/*.{png,jpg,jpeg,svg}", gulp.series("images"));
  gulp.watch("src/fonts/**/*.{otf,woff}", gulp.series("fonts"));
  gulp.watch("src/favicon/**/*", gulp.series("favicon"));

  const elev = new Eleventy();
  elev.watch();
});
