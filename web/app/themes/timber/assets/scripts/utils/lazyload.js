import LazyLoad from 'vanilla-lazyload/dist/lazyload.js';
import AOS from 'aos';

export default function () {

    const lazyImages = new LazyLoad({
        elements_selector: ".lazy",
        threshold: 300,
        callback_load: function () {
            AOS.refreshHard();
          }
    });

}
