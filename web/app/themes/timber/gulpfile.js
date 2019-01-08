/* --------------------------------------------------------------------------------
    Modules
-------------------------------------------------------------------------------- */

const args = require('yargs').argv;
const autoprefixer = require('autoprefixer');
const browserSyncSite = require('browser-sync').create('site');
const browserSyncStyleguide = require('browser-sync').create('styleguide');
const cssnano = require('cssnano');
const del = require('del');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');
const lost = require('lost');
const postcss = require('gulp-postcss');
const sass = require('gulp-dart-sass');
const sourcemaps = require('gulp-sourcemaps');
const svgmin = require('gulp-svgmin');
const svgSymbols = require('gulp-svg-symbols');
const twig = require('gulp-twig');
const webpack = require('webpack-stream');
const kss = require('kss');

const config = require('./gulpfile.config');
const webpackConfig = require('./webpack.config.js');

const isProd = args.env === 'production';
const browserSyncSiteReload = browserSyncSite.reload;
const browserSyncStyleguideReload = browserSyncStyleguide.reload;

/* --------------------------------------------------------------------------------
    CLEAN
-------------------------------------------------------------------------------- */
gulp.task('clean', (done) => {
    del(
        [
            config.root.public,
            '!./kss-styleguide/styleguide/site-assets',
            './kss-styleguide/styleguide/*.html',
            './kss-styleguide/styleguide/site-assets/**/*.css',
            './kss-styleguide/styleguide/site-assets/**/*.js',
            './kss-styleguide/styleguide/site-assets/**/*.json',
            './kss-styleguide/styleguide/site-assets/**/*.svg',
            './kss-styleguide/styleguide/site-assets/**/*.{jpg,png,gif}',
            './kss-styleguide/styleguide/site-assets/**/*.mp4',
        ],
    );
    done();
});

/* --------------------------------------------------------------------------------
    TWIG STYLEGUIDE
-------------------------------------------------------------------------------- */
const twigOptions = {
    verbose: true,
};

// eslint-disable-next-line arrow-body-style
gulp.task('twig-site', () => {
    return gulp
        .src(`${config.siteTwig.dev}/pages/*.twig`)
        .pipe(twig(twigOptions))
        .pipe(gulp.dest(config.siteTwig.dist));
});

/* --------------------------------------------------------------------------------
    WEBPACK
-------------------------------------------------------------------------------- */
const webpackTask = (watch) => {
    webpackConfig.watch = watch;
    return gulp.src(`${config.scripts.dev}/main.js`)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(config.scripts.dist))
        .pipe(gulp.dest(config.scripts.kss));
};

gulp.task('webpack', () => webpackTask(false));

gulp.task('webpack-watch', () => webpackTask(true));

/* --------------------------------------------------------------------------------
    SASS
-------------------------------------------------------------------------------- */
const sassOpts = {
    outputStyle: isProd ? 'compressed' : 'expanded',
    includePaths: ['node_modules'],
};

const sassPlugins = [
    lost(),
    autoprefixer({
        browsers: [
            'last 2 versions',
            'ie >= 10',
        ],
    }),
];

if (isProd) {
    sassPlugins.push(cssnano({
        preset: 'default',
    }));
}

// eslint-disable-next-line arrow-body-style
gulp.task('sass', () => {
    return gulp.src(`${config.styles.dev}/main.scss`)
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(sass(sassOpts)).on('error', sass.logError)
        .pipe(postcss(sassPlugins))
        .pipe(gulpif(!isProd, sourcemaps.write()))
        .pipe(gulp.dest(config.styles.dist))
        .pipe(gulp.dest(config.styles.kss))
        .pipe(browserSyncSiteReload({
            stream: true,
        }))
        .pipe(gulpif(config.styleguide, browserSyncStyleguideReload({
            stream: true,
        })));
});

// eslint-disable-next-line arrow-body-style
gulp.task('kss-sass', () => {
    return gulp.src(`${config.styles.kssDev}/kss.scss`)
        .pipe(gulpif(!isProd, sourcemaps.init()))
        .pipe(sass(sassOpts)).on('error', sass.logError)
        .pipe(postcss(sassPlugins))
        .pipe(gulpif(!isProd, sourcemaps.write()))
        .pipe(gulp.dest(config.styles.kss))
        .pipe(browserSyncStyleguideReload({
            stream: true,
        }));
});

/* --------------------------------------------------------------------------------
    ASSETS
-------------------------------------------------------------------------------- */
gulp.task('images', () => gulp
    .src(`${config.images.dev}/*`)
    .pipe(imagemin([
        imagemin.gifsicle({
            interlaced: true
        }),
        imagemin.jpegtran({
            progressive: true
        }),
        imagemin.optipng({
            optimizationLevel: 5
        }),
    ], {
        verbose: true
    }))
    .pipe(gulp.dest(config.images.dist))
    .pipe(gulp.dest(config.images.kss))
);

gulp.task('svg', () => gulp
    .src(`${config.svg.dev}/*`)
    .pipe(svgmin({
        plugins: [{
            removeViewBox: false,
        }],
    }))
    .pipe(gulp.dest(config.svg.dist))
    .pipe(gulp.dest(config.svg.kss))
);


gulp.task('fonts', () => gulp
    .src(`${config.fonts.dev}/*`)
    .pipe(gulp.dest(config.fonts.dist))
    .pipe(gulp.dest(config.fonts.kss))
);

gulp.task('json', () => gulp
    .src(`${config.json.dev}/*`)
    .pipe(gulp.dest(config.json.dist))
    .pipe(gulp.dest(config.json.kss))
);

gulp.task('video', () => gulp
    .src(`${config.video.dev}/*`)
    .pipe(gulp.dest(config.video.dist))
    .pipe(gulp.dest(config.video.kss))
);

/* --------------------------------------------------------------------------------
    SERVER
-------------------------------------------------------------------------------- */
gulp.task('browser-sync-site', (done) => {
    browserSyncSite.init({
        proxy: config.url,
        port: 3000,
        ui: {
            port: 3000,
        },
        notify: true,
        files: [
            './templates/**/*.twig',
            './lib/**/*.php',
            './*.php',
            `${config.scripts.dist}/**/*.js`,
            `${config.scripts.dist}/**/*.css`,
        ],
        ghostMode: {
            clicks: true,
            links: true,
            forms: false,
            scroll: true,
        },
        reloadDelay: 250,
    });
    done();
});

gulp.task('browser-sync-kss', (done) => {
    browserSyncStyleguide.init({
        proxy: false,
        server: {
            baseDir: './kss-styleguide/styleguide',
        },
        port: 4001,
        ui: {
            port: 4001,
        },
        notify: true,
        files: [
            './kss-styleguide/styleguide/*.html',
            './kss-styleguide/styleguide/markup/*.html',
            `${config.styles.dist}/**/*.css`,
        ],
        ghostMode: {
            clicks: true,
            links: true,
            forms: false,
            scroll: true,
        },
        reloadDelay: 2000,
    });
    done();
});

gulp.task('reload-styleguide', (done) => {
    browserSyncStyleguide.reload();
    done();
});

/* --------------------------------------------------------------------------------
    STYLEGUIDE (KSS)
-------------------------------------------------------------------------------- */

gulp.task('kss-twig-markup', () => gulp
    .src(`${config.kssTwig.dev}/*.twig`)
    .pipe(twig(twigOptions))
    .pipe(gulp.dest(config.kssTwig.dist)));

gulp.task('kss-build', () => kss(config.kssOptions));

gulp.task('kss', gulp.series(
    'sass',
    'kss-twig-markup',
    'kss-build',
    'kss-sass',
));

/* --------------------------------------------------------------------------------
    WATCH-FILES
-------------------------------------------------------------------------------- */
gulp.task('watch-files', (done) => {
    // Assets
    gulp.watch(`${config.images.dev}/**/*`, gulp.series('images'));
    gulp.watch(`${config.svg.dev}/**/*`, gulp.series('svg'));
    gulp.watch(`${config.fonts.dev}/**/*`, gulp.series('fonts'));
    gulp.watch(`${config.json.dev}/**/*`, gulp.series('json'));
    gulp.watch(`${config.video.dev}/**/*`, gulp.series('video'));

    gulp.watch(`${config.styles.dev}/**/*`, gulp.series('kss', 'reload-styleguide'));
    gulp.watch(`${config.scripts.dist}/**/*`, gulp.series('reload-styleguide'));

    // Kss
    gulp.watch(`${config.kssTwig.dev}/**/*.twig`, gulp.series('kss', 'reload-styleguide'));
    gulp.watch(`${config.styles.kssDev}/**/*`, gulp.series('kss-sass'));

    done();
});

/* --------------------------------------------------------------------------------
    BUILD TASKS
-------------------------------------------------------------------------------- */
gulp.task('build', gulp.series(
    'clean',
    gulp.parallel(
        'sass',
        'webpack',
        'images',
        'fonts',
        'video',
        'json',
    ),
    'svg',
    'kss'
));

gulp.task('default', gulp.series('build'));

/* --------------------------------------------------------------------------------
    WATCH TASK
-------------------------------------------------------------------------------- */
gulp.task('watch', gulp.series(
    'build',
    gulp.parallel(
        'webpack-watch',
        'browser-sync-site',
        'browser-sync-kss',
        'watch-files',
    )
));
