import Swiper from 'swiper/bundle';

export default function() {

    const $sectionNews = document.querySelectorAll('.section-news > .container-site');
    const $swiperNews = document.querySelectorAll('.swiper-news');
    const instancesSwiperNews = [];

    $sectionNews.forEach(($section, index) => {
        const $swiper = $section.querySelector('.swiper-news');
        const $slides = $swiper.querySelectorAll('.swiper-slide');
        const sectionID = `section-news-${index}`;
        const swiperID = `swiper-news-${index}`;

        $section.setAttribute('id', sectionID);
        $swiper.setAttribute('id', swiperID);

        const swiper = new Swiper($swiper, {
            speed: 300,
            autoplay: {
                delay: 4500,
            },
            loop: true,
            loopAdditionalSlides: 3,
            width: 250,
            spaceBetween: 20,
            navigation: {
                prevEl: `#${sectionID} .swiper-button-prev-custom`,
                nextEl: `#${sectionID} .swiper-button-next-custom`,
            },
            breakpoints: {
                400: {
                    width: 300,
                    spaceBetween: 30,
                },
                768: {
                    width: 680,
                    spaceBetween: 80,
                },
            },
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

        instancesSwiperNews.push(swiper);
    });

}
