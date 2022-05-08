const { src, dest, watch, series } = require("gulp");
// gulp-sass return a function, we invoke that function and pass require("sass") as parameter
const sass = require("gulp-sass")(require("sass"));

function buildStyle() {
  return src("index.scss")
    .pipe(sass()) // inside pipe method we pass function to run. (sass() is the function that id going to compile sass file to css)
    .pipe(dest("css")); // the output will be inside css folder in our root directory
}

// watcher function that will actively watch our source sass file and then when we make changes
// to that file and save them, it's going to automatically the buildStyle function

function watchTask() {
  watch(["index.scss"], buildStyle);
}
// export our function in series
// so that when we run gulp in terminal it will run buildStyle function first then watchTask function
exports.default = series(buildStyle, watchTask);
