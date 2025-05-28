class Cloud extends MovableObject {
    y = 10;
    width = 500;
    height = 300;

    /**
     * Creates a new `Cloud` instance.
     * @param {number} x - The x-coordinate where the cloud will be placed on the canvas.
     */
    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = x;
        this.animate();
    }

    /**
     * Handles the cloud's movement logic.
     * This method is called repeatedly to move the cloud to the left.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 200);
    }
}