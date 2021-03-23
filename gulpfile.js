/* Gulp
-------------------------------------------- */
const { series, parallel, src, dest, watch } = require('gulp');
const del = require('del');

/* Plugins
-------------------------------------------- */
const imagemin = require('gulp-imagemin');
const twig = require('gulp-twig');
const svgSprite = require('gulp-svg-sprite');
const rename = require('gulp-rename');

/* del
-------------------------------------------- */
function cleanTask(cb) {
  del(['./dist']);
  cb();
}

/* imagemin
-------------------------------------------- */
const imageminOptions =
  ([
    imagemin.gifsicle({ interlaced: true }),
    imagemin.mozjpeg({ quality: 75, progressive: true }),
    imagemin.optipng({ optimizationLevel: 5 }),
    imagemin.svgo({
      plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
    }),
  ],
  {
    verbose: true,
  });

function imagesTask() {
  return src('assets/images/**/*').pipe(imagemin(imageminOptions)).pipe(dest('./dist/images'));
}

/* twig
-------------------------------------------- */
function twigTask() {
  return src('./templates/pages/*.twig').pipe(twig()).pipe(dest('./'));
}

/* fonts
-------------------------------------------- */
function fontsTask() {
  return src('**/*', { cwd: './assets/fonts' }).pipe(dest('./dist/fonts'));
}

/* favicons
-------------------------------------------- */
function faviconsTask() {
  return src('**/*', { cwd: './assets/favicons' }).pipe(dest('./dist/favicons'));
}

/* icons
-------------------------------------------- */
const config = {
  mode: {
    defs: {
      dest: '',
      sprite: 'sprite.svg',
    },
  },
};

function iconsTask() {
  return src('**/*.svg', { cwd: './assets/icons' }).pipe(svgSprite(config)).pipe(dest('./dist/icons'));
}

/* icomoonSvgTask
-------------------------------------------- */
function icomoonSvgTask() {
  return src('symbol-defs.svg', { cwd: './assets/icomoon' }).pipe(dest('./dist/svg'));
}

/* icomoonCssTask
-------------------------------------------- */
function icomoonCssTask() {
  return src('style.css', { cwd: './assets/icomoon' }).pipe(rename('icomoon.scss')).pipe(dest('./assets/styles'));
}

/* watch
-------------------------------------------- */
function watchTask(cb) {
  watch('assets/images/**/*', imagesTask);
  watch('./templates/**/*.twig', twigTask);
  cb();
}

/* env
-------------------------------------------- */
// if (process.env.NODE_ENV === 'production') {
//   exports.build = series(transpile, minify);
// } else {
//   exports.build = series(transpile, livereload);
// }

/* tasks
-------------------------------------------- */
exports.default = series(cleanTask, imagesTask, fontsTask, icomoonSvgTask, icomoonCssTask, faviconsTask);
exports.watch = series(cleanTask, imagesTask, fontsTask, icomoonSvgTask, icomoonCssTask, watchTask, faviconsTask);
exports.clean = cleanTask;
exports.images = imagesTask;
exports.twig = twigTask;
exports.fonts = fontsTask;
exports.icons = iconsTask;
exports.icomoonSvg = icomoonSvgTask;
exports.icomoonCss = icomoonCssTask;
exports.favicons = faviconsTask;
