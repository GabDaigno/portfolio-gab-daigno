export default class Loader {
    constructor(element) {
        this.element = element;
        this.numbers = element.querySelectorAll('.loader__number-base, .loader__number-fill');

        //Déjà vu pendant cette session: on n'affiche pas le loader
        if (sessionStorage.getItem('loaderSeen')) {
            this.element.remove();
            document.body.classList.remove('is-loading');
            document.body.classList.add('is-loaded');
            return;
        }

        this.minDuration = 2500;   // durée minimale en ms
        this.displayed = 0;        // le chiffre affiché
        this.pageLoaded = false;
        this.startTime = performance.now();

        this.waitForPage();
        this.animate();
    }

    waitForPage() {
        const onReady = () => {
            // On attend aussi que les polices soient prêtes
            document.fonts.ready.then(() => {
                this.pageLoaded = true;
            });
        };

        if (document.readyState === 'complete') {
            onReady();
        } else {
            window.addEventListener('load', onReady);
        }
    }

    animate() {
        const elapsed = performance.now() - this.startTime;
        let target = Math.min((elapsed / this.minDuration) * 100, 100);

        // Tant que la page n'est pas chargée, on reste bloqué à 90 %
        if (!this.pageLoaded) {
            target = Math.min(target, 90);
        }

        // Le chiffre rattrape doucement la cible
        this.displayed += (target - this.displayed) * 0.1;

        if (this.displayed > 99.5) {
            this.displayed = 100;
        }

        this.update(this.displayed);

        if (this.displayed < 100) {
            requestAnimationFrame(() => this.animate());
        } else {
            setTimeout(() => this.finish(), 400); // petite pause à 100 %
        }
    }

    update(value) {
        const rounded = Math.round(value);
        this.element.style.setProperty('--progress', value);
        this.numbers.forEach((el) => {
            el.textContent = `${rounded}%`;
        });
    }

    finish() {
        sessionStorage.setItem('loaderSeen', 'true');
        this.element.classList.add('is-done');

        // On attend la fin de l'animation CSS (0.6s) avant de retirer le loader
        setTimeout(() => {
            this.element.remove();
            document.body.classList.remove('is-loading');
            document.body.classList.add('is-loaded');
            window.dispatchEvent(new Event('loader:done'));
        }, 600);
    }
}