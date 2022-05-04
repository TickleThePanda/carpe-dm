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

gulp.task("generate", async () => {
  const elev = new Eleventy();
  await elev.write();
});

gulp.task("generate-dev", async () => {
  const elev = new Eleventy();
  try {
    await elev.write();
  } catch (e) {
    console.log("Failed to write elevent", e);
  }
});

gulp.task("assets", gulp.parallel("css", "images", "fonts"));

gulp.task("build", gulp.series("generate", "assets", "redirects"));

gulp.task("watch", () => {
  gulp.watch(".eleventy.js", gulp.series("generate-dev"));
  gulp.watch("src/view/**/*", gulp.series("generate-dev"));
  gulp.watch("src/style/**/*.less", gulp.series("css"));
  gulp.watch("src/images/**/*.{png,jpg,jpeg,svg}", gulp.series("images"));
  gulp.watch("src/fonts/**/*.{otf,woff}", gulp.series("fonts"));
});
