import Swiper from 'swiper/dist/js/swiper';

export default function () {
    const elSwiper = Array.from(document.querySelectorAll('.c-swiper-images'));

    elSwiper.forEach((element, index) => {
        element.id = `swiper-images-${index}`;
        element.setAttribute('id', element.id);

        const swiperImages = new Swiper(`#${element.id} .swiper-container`, {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            speed: 750,
            delay: 2000,
            preloadImages: true,
            pagination: {
                el: `#${element.id} .swiper-pagination`,
                type: 'bullets',
                clickable: true,
                renderBullet: (pagiIndex, className) => {

                    pagiIndex++;

                    const label = pagiIndex < 10 ? `0${pagiIndex}` : pagiIndex;

                    return `<div class="${className}">
                                <div class="swiper-pagination__number">${label}</div>
                                <div class="swiper-pagination__line"></div>
                            </div>`;
                },
            },
            navigation: {
                nextEl: `#${element.id} .swiper-btn-next`,
                prevEl: `#${element.id} .swiper-btn-prev`,
            },
            autoplay: {
                delay: 4000,
            },

        });
    });
}
