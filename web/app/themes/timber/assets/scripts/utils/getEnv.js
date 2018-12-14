export default function () {
    const body = document.querySelector('body');
    const { href } = window.location;
    const isDev = !!(href.includes('local') || href.includes('dev') || href.includes('stage') || href.includes('test'));
    const classEnv = isDev ? 'is-dev' : 'is-prod';

    body.classList.add(classEnv);

    return isDev ? 'dev' : 'prod';
}
