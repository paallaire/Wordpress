

export default function() {

    const $html = document.querySelector('html');
    const $hamburger = document.querySelectorAll('.hamburger');
    const $navMobile = document.querySelector('#nav-mobile');
    const instancesSwiperRecipes = [];

    $hamburger.forEach(($element, index) => {

        $element.addEventListener('click', (e) => {
            e.preventDefault();

            const $hamburgerHeader = document.querySelector('#site-nav .hamburger');
            const $hamburgerNavMobile = document.querySelector('#nav-mobile .hamburger');

            $navMobile.classList.toggle('is-active');
            $html.classList.toggle('no-scroll');

            if( $navMobile.contains('is-active') ) {
                $hamburgerHeader.classList.add('is-active');
                $hamburgerNavMobile.classList.add('is-active');
            }
            else {
                $hamburgerHeader.classList.remove('is-active');
                $hamburgerNavMobile.classList.remove('is-active');
            }

        })
    
    });

}
