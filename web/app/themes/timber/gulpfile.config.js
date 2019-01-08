const assetsDev = './assets';
const assetsDist = './dist';
const assetsPublic = './dist';
const twigDev = './templates';

const kssDist = './kss-styleguide/styleguide/site-assets'

module.exports = {
    proxy: "http://wordpress.test/",
    root: {
        dev: assetsDev,
        dist: assetsDist,
        public: assetsPublic,
    },
    styles: {
        dev: `${assetsDev}/styles`,
        dist: `${assetsDist}/styles`,
        kss: `${kssDist}/styles`,
        kssDev: './kss-styleguide/custom-template/kss-assets/css',
    },
    scripts: {
        dev: `${assetsDev}/scripts`,
        dist: `${assetsDist}/scripts`,
        kss: `${kssDist}/scripts`,
    },
    images: {
        dev: `${assetsDev}/images`,
        dist: `${assetsDist}/images`,
        kss: `${kssDist}/images`,
    },
    svg: {
        dev: `${assetsDev}/svg`,
        dist: `${assetsDist}/svg`,
        kss: `${kssDist}/svg`,
    },
    fonts: {
        dev: `${assetsDev}/fonts`,
        dist: `${assetsDist}/fonts`,
        kss: `${kssDist}/fonts`,
    },
    json: {
        dev: `${assetsDev}/json`,
        dist: `${assetsDist}/json`,
        kss: `${kssDist}/json`,
    },
    video: {
        dev: `${assetsDev}/video`,
        dist: `${assetsDist}/video`,
        kss: `${kssDist}/video`,
    },
    siteTwig: {
        dev: twigDev,
        dist: './public',
    },
    kssTwig: {
        dev: './kss-styleguide/markup',
        dist: './kss-styleguide/styleguide/markup',
    },
    browserSync: {
        baseDir: './public',
    },
    styleguide: true,
    kssOptions: {
        title: 'Styleguide',
        mask: '*.scss',
        placeholder: '[modifier]',
        builder: 'kss-styleguide/custom-template',
        source: 'assets/styles/',
        destination: 'kss-styleguide/styleguide/',
        homepage: '../../kss-styleguide/kss-homepage.md',
        css: [
            '/site-assets/styles/kss.css',
            '/site-assets/styles/main.css',
        ],
        js: [
            '/site-assets/scripts/main.js',
        ],
    },
};
