export default class progressBar {

    constructor() {
        this.El = document.querySelector('#progress-bar');
        this.start = 0;
        this.end = 100;
        this.duration = 0;

        console.log(this.El);

        this.init();
    }

    init() {
        let perfData = window.performance.timing;
        let EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart)
        this.duration = parseInt((EstimatedTime / 1000) % 60) * 100;

        this.animation(this.El, this.start, this.end, this.duration);
    }

    animation(el, start, end, duration) {

        let range = end - start,
            current = start,
            increment = end > start ? 1 : -1,
            stepTime = Math.abs(Math.floor(duration / range));

        let timer = setInterval(() => {
            current += increment;

            this.El.style.width = `${current}%`;

            if (current == end) {
                clearInterval(timer);
            }
        }, stepTime);

    }

}
