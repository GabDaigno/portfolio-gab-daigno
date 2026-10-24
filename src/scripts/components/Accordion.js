export default class Accordion {
    constructor(element) {
        this.element = element;
        this.button = element.querySelector('.accordion__button');

        this.button.addEventListener('click', (e) => {
            e.preventDefault(); // le href="#" ne fait pas remonter la page
            this.element.classList.toggle('is-open');
        });
    }
}