export default class Cursor {
    constructor(element) {
        this.element = element;

        // Pas de curseur custom sur écran tactile
        this.isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        if (!this.isDesktop) {
            this.element.style.display = 'none';
            return;
        }

        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.smoothness = 0.2; // 0.1 = plus lent, 1 = instantané

        this.hoverTargets = 'a, button, [data-cursor="hover"]';

        this.init();

        // Retrouve la position de la souris de la page précédente (optionnel)
        const saved = sessionStorage.getItem('cursorPos');
        if (saved) {
            const { x, y } = JSON.parse(saved);
            this.mouseX = this.cursorX = x;
            this.mouseY = this.cursorY = y;
            this.element.classList.add('visible');
        }
    }

    init() {
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
        document.addEventListener('mouseleave', () => this.element.classList.remove('visible'));
        document.addEventListener('mouseover', (e) => this.onMouseOver(e));

        window.addEventListener('pagehide', () => {
            sessionStorage.setItem(
                'cursorPos',
                JSON.stringify({ x: this.mouseX, y: this.mouseY })
            );
        });

        this.animate();
    }

    onMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;

        if (!this.element.classList.contains('visible')) {
            this.cursorX = this.mouseX;
            this.cursorY = this.mouseY;
            this.element.classList.add('visible');
        }
    }

    onMouseOver(e) {
        const target = e.target.closest(this.hoverTargets);
        this.element.classList.toggle('is-hovering', !!target);
    }

    animate() {
        this.cursorX += (this.mouseX - this.cursorX) * this.smoothness;
        this.cursorY += (this.mouseY - this.cursorY) * this.smoothness;

        this.element.style.transform =
            `translate(${this.cursorX}px, ${this.cursorY}px) translate(-50%, -50%)`;

        requestAnimationFrame(() => this.animate());
    }
}