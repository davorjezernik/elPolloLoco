class BackgroundObjects extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Creates a new `BackgroundObjects` instance.
     * @param {string} imagePath - The path to the image file for the background object.
     * @param {number} x - The x-coordinate where the background object will be placed on the canvas.
     * @param {number} y - The y-coordinate where the background object will be placed on the canvas.
     */
    constructor(imagePath, x, y) {
        super(); 
        this.loadImage(imagePath); 
        this.x = x; 
        this.y = 480 - this.height; 
    }
}