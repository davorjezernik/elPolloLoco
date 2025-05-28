class StatusBarBottle extends DrawableObject {
    imagesBottleBar = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    /**
     * Creates a new `StatusBarBottle` instance.
     */
    constructor() {
        super();
        this.loadImages(this.imagesBottleBar);
        this.x = 20;
        this.y = 80;
        this.width = 192;
        this.height = 48;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage of the status bar based on the number of bottles collected.
     * @param {number} bottleCount - The number of bottles collected.
     */
    setPercentage(bottleCount) {
        this.bottleCount = bottleCount;
        let path = this.imagesBottleBar[this.resolveImageIndex()];
        this.img = this.imgCache[path];
    }

    /**
     * Determines the appropriate image index based on the number of bottles collected.
     * @returns {number} - The index of the image in the `imagesBottleBar` array.
     */
    resolveImageIndex() {
        if (this.bottleCount >= 100) {
            return 5;
        } else if (this.bottleCount >= 80) {
            return 4;
        } else if (this.bottleCount >= 60) {
            return 3;
        } else if (this.bottleCount >= 40) {
            return 2;
        } else if (this.bottleCount >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}