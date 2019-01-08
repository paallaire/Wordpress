import Rellax from 'rellax';
import im from '../../../node_modules/include-media-export/dist/include-media-1.0.2.min.js';
import _debounce from 'lodash/debounce';

export default function () {

    let isRellaxActive = false;
    let elRellax = document.querySelectorAll('.rellax');
    let rellax;

    const rellaxOnResize = () => {

        if (isRellaxActive && im.lessThan('large')) {
            isRellaxActive = false;
            rellax.destroy();
            console.log("rellax destory");
        }

    }

    const rellaxInit = () => {

        rellax = new Rellax('.rellax', {
            speed: -2,
            center: true,
            wrapper: null,
            round: true,
            vertical: true,
            horizontal: false,
        });

        if (rellax) {
            isRellaxActive = true;
        }

        window.addEventListener('resize', _debounce((e) => {
            rellaxOnResize();
        }, 50));
        rellaxOnResize();
    }

    // Init
    if (elRellax.length > 0) {
        rellaxInit();
    }

}
