class StatusBarEndBoss extends DrawableObject {
    imagesHealthBoss = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];

    world;
    percentage = 100;

    /**
     * Creates a new `StatusBarEndBoss` instance.
     * @param {MovableObject} endboss - The end boss instance.
     */
    constructor(endboss) {
        super();
        this.loadImage('img/7_statusbars/2_statusbar_endboss/orange/orange0.png');
        this.loadImages(this.imagesHealthBoss);
        this.y = 140;
        this.width = 192;
        this.height = 48;
        this.endboss = endboss;
        this.animateBar();
        this.setPercentage(100);
    }

    /**
     * Animates the status bar to follow the end boss's position.
     */
    animateBar() {
        setInterval(() => {
            if (this.endboss) {
                this.x = this.endboss.x + (this.endboss.width / 2) - (this.width / 2);
            }
        }, 1000 / 60);
    }

    /**
     * Sets the percentage of the status bar based on the end boss's health.
     * @param {number} percentage - The health percentage of the end boss.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.imagesHealthBoss[this.resolveImageIndex()];
        this.img = this.imgCache[path];
    }

    /**
     * Determines the appropriate image index based on the end boss's health percentage.
     * @returns {number} - The index of the image in the `imagesHealthBoss` array.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}