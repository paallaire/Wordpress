export default function () {
    const html = document.querySelector('html');

    return html.getAttribute('lang') !== null ? html.getAttribute('lang') : 'en';
}
