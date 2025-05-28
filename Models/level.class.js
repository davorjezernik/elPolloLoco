class Level {
    enemies;
    clouds;
    backgroundObject;
    bottlesLeft;
    bottlesRight;
    coin;
    levelEndX = 3600;

    /**
     * Creates a new `Level` instance.
     * @param {Array} enemies - Array of enemies in the level.
     * @param {Array} clouds - Array of clouds in the level.
     * @param {Array} backgroundObject - Array of background objects in the level.
     * @param {Array} bottlesLeft - Array of left-facing collectable bottles in the level.
     * @param {Array} bottlesRight - Array of right-facing collectable bottles in the level.
     * @param {Array} coin - Array of collectable coins in the level.
     */
    constructor(enemies, clouds, backgroundObject, bottlesLeft, bottlesRight, coin) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObject = backgroundObject;
        this.bottlesLeft = bottlesLeft;
        this.bottlesRight = bottlesRight;
        this.coin = coin;
    }
}