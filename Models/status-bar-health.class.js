class StatusBarHealth extends DrawableObject {
    imagesHealth = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];

    percentage = 100;

    /**
     * Creates a new `StatusBarHealth` instance.
     */
    constructor() {
        super();
        this.loadImages(this.imagesHealth);
        this.x = 20;
        this.y = 0;
        this.width = 192;
        this.height = 48;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage of the status bar based on the player's health.
     * @param {number} percentage - The health percentage of the player.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.imagesHealth[this.resolveImageIndex()];
        this.img = this.imgCache[path];
    }

    /**
     * Determines the appropriate image index based on the player's health percentage.
     * @returns {number} - The index of the image in the `imagesHealth` array.
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