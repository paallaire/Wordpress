import Swiper from 'swiper/bundle';

export default function() {

    const $sectionRecipes = document.querySelectorAll('.section-recipes > .container-site');
    const instancesSwiperRecipes = [];

    $sectionRecipes.forEach(($section, index) => {
        const $swiper = $section.querySelector('.swiper-recipes');
        const $slides = $swiper.querySelectorAll('.swiper-slide');
        const sectionID = `section-recipes-${index}`;
        const swiperID = `swiper-recipes-${index}`;

        $section.setAttribute('id', sectionID);
        $swiper.setAttribute('id', swiperID);

        const swiper = new Swiper($swiper, {
            speed: 500,
            // autoplay: {
            //     delay: 5000,
            // },
            slidesPerView: 1,
            loop: true,
            spaceBetween: 30,
            allowTouchMove: $slides.length > 1 ? true : false,
            navigation: {
                prevEl: `#${sectionID} .swiper-button-prev-custom`,
                nextEl: `#${sectionID} .swiper-button-next-custom`,
            },
            // breakpoints: {
            //     1024: {
            //         spaceBetween: 20,
            //         width: 300,
            //     },
            // },
        });

        document.querySelectorAll(`#${sectionID} .swiper-button-prev-custom`).forEach(($element, index) => {

            $element.addEventListener('click',(e) => {
                swiper.slidePrev();
            })

        });

        document.querySelectorAll(`#${sectionID} .swiper-button-next-custom`).forEach(($element, index) => {

            $element.addEventListener('click',(e) => {
                swiper.slideNext();
            })

        });

        instancesSwiperRecipes.push(swiper);
    });

}
