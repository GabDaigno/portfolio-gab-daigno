import Icons from './utils/Icons.js';
import Swiper from 'swiper/bundle';

class Main {
  constructor() {
    this.init();
    this.initSwiperPagination();
    this.initSwiperBigPagination();
    this.toggle
  }

  init() {
    Icons.load();
    const buttons = document.querySelector('.js-toggle');
    buttons.addEventListener('click', this.toggleActive);
  }

  toggleActive() {
    const text = document.querySelector('.nav-is-active');
    text.classList.toggle('inactive');
    console.log('click')
  }

  initSwiperBigPagination() {
    const target = document.querySelector('.js-swiper-big');
    if (target) {
      const swiper = new Swiper(target, {
        speed: 400,
        slidesPerView: 1.5,
        spaceBetween: 30,
        breakpoints: {
          300: {
            slidesPerView: 1,
          },

          480: {
            slidesPerView: 1,
          },

          1024: {
            slidesPerView: 1.5,
          },
        },
        pagination: {
          el: '.swiper-pagination',
        },
      });
    }
  }

  initSwiperPagination() {
    const target = document.querySelector('.js-swiper-page');
    if (target) {
      const swiper = new Swiper(target, {
        slidesPerView: 3,
        spaceBetween: 30,
        speed: 400,
        breakpoints: {
          300: {
            slidesPerView: 1,
          },

          480: {
            slidesPerView: 2,
          },

          1024: {
            slidesPerView: 3,
          },
        },
        pagination: {
          el: '.swiper-pagination',
        },
      });
    }
  }
}
new Main();
