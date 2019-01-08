import AOS from 'aos';
import im from '../../../node_modules/include-media-export/dist/include-media-1.0.2.min.js';

export default function () {

    AOS.init({
        offset: 0,
        duration: 300,
        easing: 'ease',
        delay: 0,
        disable: () => {
            return im.lessThan('large')
        },
        once: true,
    });

    // document.addEventListener('DOMContentLoaded', function () {
    //     AOS.refresh();
    // }, false);

}
