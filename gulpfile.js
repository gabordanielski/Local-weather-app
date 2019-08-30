const gulp        = require('gulp');
const browsersync = require('browser-sync').create();
const sass        = require('gulp-sass');

function sassWatch(){
	return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
		.pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browsersync.stream());
}

function js(){
	return gulp
		.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
		.pipe(gulp.dest("src/js"));
}

function browserSync(done) {
  browsersync.init({
    server: "./src"
  });
  done();
}

function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function watchFiles() {
  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], sassWatch);
  gulp.watch("src/*.html", browserSyncReload);
}

const build = gulp.series(js);
const watching = gulp.parallel(watchFiles, browserSync);

exports.build = gulp.series(js,sassWatch);
exports.watch = watching;