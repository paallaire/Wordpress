import Swiper from 'swiper/bundle';

export default function () {

    const $swiperProducts = document.querySelectorAll('.swiper-products');
    const instancesSwiperProducts = [];

    $swiperProducts.forEach(($element, index) => {
        const swiperID = `swiper-products-${index}`;
        const $slides = $element.querySelectorAll('.swiper-slide');

        $element.setAttribute('id', swiperID);

        const swiper = new Swiper($element, {
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            speed: 600,
            // autoplay: {
            //     delay: 5000,
            // },
            slidesPerView: 1,
            loop: true,
            spaceBetween: 100,
            allowTouchMove: $slides.length > 1 ? true : false,
            navigation: {
                prevEl: `#${swiperID} .swiper-button-prev-custom`,
                nextEl: `#${swiperID} .swiper-button-next-custom`,
            },
            // breakpoints: {
            //     1024: {
            //         spaceBetween: 20,
            //         width: 300,
            //     },
            // },
        });

        instancesSwiperProducts.push(swiper);


    });

}
