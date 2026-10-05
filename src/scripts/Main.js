import ComponentFactory from './ComponentFactory.js';
import Icons from './utils/Icons.js';

class Main {
  constructor() {
    this.init();
  }

  init() {
    document.documentElement.classList.add('has-js');

    new ComponentFactory();

    // Chargement du sprite svg par le système d'icône
    Icons.load();
  }
}

new Main();