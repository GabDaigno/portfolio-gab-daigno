export default class Scrolly {
  constructor(element) {
    this.element = element;

    // Les options doivent exister AVANT init(), sinon l'observer les ignore
    this.options = {
      rootMargin: '0px 0px -8% 0px', // déclenche un peu après l'entrée dans l'écran
      threshold: 0.1,
    };

    this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      this.watch.bind(this),
      this.options,
    );

    const items = this.element.querySelectorAll('[data-scrolly]');
    for (let i = 0; i < items.length; i++) {
      observer.observe(items[i]);
    }
  }

  watch(entries, observer) {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const target = entry.target;

      if (entry.isIntersecting) {
        target.classList.add('is-active');
        //observer.unobserve(target); // décommente pour jouer l'animation une seule fois
      } else {
        target.classList.remove('is-active');
      }
    }
  }
}
