const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function buildStyle() {
  //* means that look at any file name with extension .scss
  // any file that start with underscore _ will not be compiled to css
  // underscore tells sass taht this file is just a partial which we might use elsewhere, but we
  // don't want to compile it whem we run gulp command
  // return src("*.scss").pipe(sass()).pipe(dest("css"));
  // sass_styles/**/* it's going to find any sass file or any subfolder that has .sass file inside it
  return src("sass_styles/**/*.scss").pipe(sass()).pipe(dest("css"));
}

function watchTask() {
  watch(["sass_styles/**/*.scss"], buildStyle);
}
exports.default = series(buildStyle, watchTask);
