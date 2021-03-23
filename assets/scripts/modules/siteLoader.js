import { gsap, TweenLite, Back, Power4 } from 'gsap';
import imagesLoaded from 'imagesLoaded';

export default function(callback) {
  let loadingProgress = 0;
  let loadedCount = 0;
  let $images = document.querySelectorAll('img');
  let $text = document.querySelector('.txt-perc');
  let $bar = document.querySelector('#progress span');
  let imgLoad = imagesLoaded($images);

  /* timeline
  -------------------------------------------- */
  let progressTl = gsap.timeline({
    paused: true,
    onUpdate: progressUpdate,
    onComplete: loadComplete,
  });

  progressTl.to($bar, { width: 100 });

  function progressUpdate() {
    loadingProgress = Math.round(progressTl.progress() * 100);
    $text.innerHTML = loadingProgress + ' %';
  }

  function loadComplete() {
    let preloaderOutTl = gsap.timeline({
      onComplete: () => {
        console.log('preloaderOutTl complete');
        callback();
      },
    });

    preloaderOutTl
      .to('#progress', 0.3, { y: 100, autoAlpha: 0, ease: Back.easeIn })
      .to($text, 0.3, { y: 100, autoAlpha: 0, ease: Back.easeIn }, 0.1)
      .to('#preloader', 0.7, { yPercent: 100, ease: Power4.easeInOut })
      .to('#preloader', 0.1, { opacity: 0, className: '+=is-hidden' });
  }

  /* imagesLoaded
  -------------------------------------------- */
  imgLoad.on('done', function(instance) {
    console.log('DONE  - all images have been successfully loaded');
  });

  imgLoad.on('progress', function(instance, image) {
    if (image.isLoaded) {
      loadProgress();
    }
  });

  function loadProgress(imgLoad, image) {
    loadedCount++;
    loadingProgress = loadedCount / $images.length;
    TweenLite.to(progressTl, 1, { progress: loadingProgress });
  }
}
