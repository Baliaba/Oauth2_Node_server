const gulp = require("gulp");
const apidoc = require("gulp-apidoc");

gulp.task("apidoc", (done) => {
    apidoc({
        src: "./controllers",
        dest: "./controllers/apis/docs/"
    }, done);
});

gulp.task("watch", () => {
    gulp.watch(["./routes/**"], ["apidoc"]);
});