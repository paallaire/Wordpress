const elHtml = document.documentElement;
const elBody = document.body;
const searchTermsDev = ['local', 'dev', 'stage', 'test'];

const lang = elHtml.getAttribute('lang') !== null ? elHtml.getAttribute('lang') : 'en';
const isDev = searchTermsDev.some((el) => window.location.href.includes(el));
const isDebug = elHtml.hasAttribute('data-debug');

export { elHtml, elBody, lang, isDev, isDebug };
