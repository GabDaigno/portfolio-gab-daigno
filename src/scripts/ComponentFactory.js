import Scrolly from './components/Scrolly.js';
import Youtube from './components/Youtube.js';
import Cursor from './components/Cursor.js';
import Loader from './components/Loader.js';
import Scroller from './components/Scroller.js';
import Accordion from './components/Accordion.js';

export default class ComponentFactory {
  constructor() {
    this.componentList = {
      Scrolly,
      Youtube,
      Cursor,
      Loader,
      Scroller,
      Accordion
    };
    this.init();
  }

  init() {
    const components = document.querySelectorAll('[data-component]');

    for (let i = 0; i < components.length; i++) {
      const element = components[i];
      const componentName = element.dataset.component;

      if (this.componentList[componentName]) {
        new this.componentList[componentName](element);
      } else {
        console.log(`la compsante ${componentName} n'existe pas`);
      }
    }
  }
}
