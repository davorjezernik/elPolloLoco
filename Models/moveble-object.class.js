class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    health = 100;
    lastHit = 0;
    chikenCount = [];
    isAlive = false;
    explodeBottle = false;

    /**
     * The offset for collision detection.
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    /**
     * Applies gravity to the object, causing it to fall when in the air.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isInAir() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 30);
    }

    /**
     * Checks if the object is in the air.
     * @returns {boolean} - True if the object is in the air, otherwise false.
     */
    isInAir() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 170;
        }
    }

    /**
     * Checks if the object is colliding with another movable object.
     * @param {MovableObject} mo - The other movable object to check for collision.
     * @returns {boolean} - True if a collision is detected, otherwise false.
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }

    /**
     * Reduces the object's health when hit and updates the last hit timestamp.
     */
    hit() {
        this.health -= 20;
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is currently hurt (i.e., recently hit).
     * @returns {boolean} - True if the object was hurt within the last 0.5 seconds, otherwise false.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    /**
     * Checks if the object is dead (i.e., health is 0).
     * @returns {boolean} - True if the object is dead, otherwise false.
     */
    isDead() {
        return this.health <= 0;
    }

    /**
     * Cancels animations after the object is dead.
     * @returns {boolean} - Always returns true to indicate the object is no longer alive.
     */
    cancelAnimationAfterDead() {
        return this.isAlive = true;
    }

    /**
     * Plays an animation using the provided array of images.
     * @param {string[]} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imgCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right based on its speed.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left based on its speed.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by setting its vertical speed.
     */
    jump() {
        this.speedY = 20;
    }

    /**
     * Makes the object bounce off a chicken by setting its vertical speed and adjusting its position.
     */
    bouncFromChicken() {
        this.speedY = 12;
        this.y -= 10;
    }
}