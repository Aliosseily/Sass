const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
//gulp-purgecss used to remove all unused css properties from the generated css file
const purgecss = require("gulp-purgecss");

function buildStyle() {
  //* means that look at any file name with extension .scss
  // any file that start with underscore _ will not be compiled to css
  // underscore tells sass taht this file is just a partial which we might use elsewhere, but we
  // don't want to compile it whem we run gulp command
  // return src("*.scss").pipe(sass()).pipe(dest("css"));
  // sass_styles/**/* it's going to find any sass file or any subfolder that has .sass file inside it
  return src("sass_styles/**/*.scss")
    .pipe(sass())
    .pipe(
      purgecss({
        // content tells the plugin which files to look in to determine what css rules we are using for our website
        // ['*.html'] any file name that ends with .html in our root level of our project
        content: ["*.html"],
      })
    )
    .pipe(dest("css"));
}
function watchTask() {
  //*.html watch html files as well, so that when we purge css file, and then we use css property
  // that is removed from css file it will watch html file and create that property

  watch(["sass_styles/**/*.scss", "*.html"], buildStyle);
}
exports.default = series(buildStyle, watchTask);
