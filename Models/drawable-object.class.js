class DrawableObject {
    x = 120;
    y = 285;
    height = 150;
    width = 100;
    img;
    imgCache = {};
    currentImage = 0;

    /**
     * Loads an image from the specified path and assigns it to the `img` property.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object on the canvas using the provided rendering context.
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads multiple images from an array of paths and caches them for later use.
     * @param {string[]} arr - An array of paths to image files.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }
}

