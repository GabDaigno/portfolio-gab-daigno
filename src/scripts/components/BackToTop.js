export default class BackToTop {
    constructor(element) {
        this.element = element;
        this.showAfter = 500; // le bouton apparaît après 400px de scroll

        window.addEventListener('scroll', () => this.update(), { passive: true });
        this.update(); // au cas où la page se recharge déjà scrollée

        this.element.addEventListener('click', (e) => {
            e.preventDefault(); // pas de #header dans l'adresse
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    update() {
        this.element.classList.toggle('is-visible', window.scrollY > this.showAfter);
    }
}