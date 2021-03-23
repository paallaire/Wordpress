export default function() {

    const Cookies = require('cookies-js');
    const $modalAge = document.querySelector('#modal-age');
    const $html = document.querySelector('html');
    const $yes = document.querySelector('#modal-age-yes');

    if(Cookies.get('age') !== '1') {
        $modalAge.style.display = 'flex';
        $modalAge.classList.toggle('is-active');
        $html.classList.toggle('no-scroll');
    }
    else {
        $modalAge.style.display = 'none';
    }

    $yes.addEventListener('click', (e) => {
        e.preventDefault();
        Cookies.set('age', '1', { expires: 60 * 60 * 24 }); // Expires in 24 hours

        $modalAge.classList.remove('is-active');
        $html.classList.remove('no-scroll');

        setTimeout(() => {
            $modalAge.remove();
        }, 500);

    })

}
