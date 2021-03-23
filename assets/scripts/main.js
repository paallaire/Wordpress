import 'swiper/swiper-bundle.css';

import { isDev } from './utils/env';
import StickyNav from './modules/StickyNav';
import GridVisualizer from './modules/GridVisualizer';
import siteLoader from './modules/siteLoader';

import AnimationOnScrollInit from './modules/AnimationOnScroll';
import navMobileInit from './modules/navMobile';
import modalAgeInit from './modules/modalAge';

import swiperNewsInit from './modules/swiperNews';
import swiperRecipesInit from './modules/swiperRecipes';
import swiperBaseInit from './modules/swiperBase';
import swiperHeroInit from './modules/swiperHero';
import swiperProductsInit from './modules/swiperProducts';
import swiperImageTextInit from './modules/swiperImageText';

document.addEventListener('DOMContentLoaded', function() {
  const nav = new StickyNav('#site-nav', {});
  nav.init();

  AnimationOnScrollInit();
  navMobileInit();
  modalAgeInit();

  swiperHeroInit();
  swiperNewsInit();
  swiperRecipesInit();
  swiperBaseInit();
  swiperProductsInit();
  swiperImageTextInit();

  if (isDev) {
    const websiteGrid = new GridVisualizer({
      numberColumns: 18,
      containerCSsClass: 'container-site',
      rowCssClass: 'flex -mx-2',
      columnsCssClass: 'px-2 w-1/18',
      columnsCssClassCustom: null,
    });
    websiteGrid.init();
    document.querySelector('body').classList.add('debug-screens');
  }
});
