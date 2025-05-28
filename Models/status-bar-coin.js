class StatusBarCoin extends DrawableObject {
    imagesCoinBar = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    /**
     * Creates a new `StatusBarCoin` instance.
     */
    constructor() {
        super();
        this.loadImages(this.imagesCoinBar);
        this.x = 20;
        this.y = 40;
        this.width = 192;
        this.height = 48;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage of the status bar based on the number of coins collected.
     * @param {number} coinCount - The number of coins collected.
     */
    setPercentage(coinCount) {
        this.coinCount = coinCount;
        let path = this.imagesCoinBar[this.resolveImageIndex()];
        this.img = this.imgCache[path];
    }

    /**
     * Determines the appropriate image index based on the number of coins collected.
     * @returns {number} - The index of the image in the `imagesCoinBar` array.
     */
    resolveImageIndex() {
        if (this.coinCount >= 100) {
            return 5;
        } else if (this.coinCount >= 80) {
            return 4;
        } else if (this.coinCount >= 60) {
            return 3;
        } else if (this.coinCount >= 40) {
            return 2;
        } else if (this.coinCount >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}