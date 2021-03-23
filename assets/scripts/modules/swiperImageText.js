import Swiper from 'swiper/bundle';

export default function() {

    const $swiperRecipes = document.querySelectorAll('.swiper-image-text');
    const instancesSwiperRecipes = [];

    $swiperRecipes.forEach(($element, index) => {
        const swiperID = `swiper-image-text-${index}`;
        const $slides = $element.querySelectorAll('.swiper-slide');
        
        $element.setAttribute('id', swiperID);

        const swiper = new Swiper($element, {
            speed: 1000,
            autoplay: {
                delay: 2000,
            },
            slidesPerView: 1,
            loop: true,
            spaceBetween: 30,
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

        instancesSwiperRecipes.push(swiper);
    });

}
