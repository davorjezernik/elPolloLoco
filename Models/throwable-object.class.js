class ThrowableObject extends MovableObject {
    explodeBottle;

    imagesRotating = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    imagesHit = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    crackingSound = new Audio('Audio/crack.mp3');
    isMuted = false;

    /**
     * Creates a new `ThrowableObject` instance.
     * @param {number} x - The x-coordinate where the bottle is thrown.
     * @param {number} y - The y-coordinate where the bottle is thrown.
     * @param {World} world - The game world instance.
     */
    constructor(x, y, world) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.imagesRotating);
        this.loadImages(this.imagesHit);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 80;
        this.world = world;
        this.throw();
        this.animate();
    }

    /**
     * Throws the bottle by applying gravity and horizontal movement.
     */
    throw() {
        this.speedY = 1.5;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }

    /**
     * Handles the bottle's animation, including rotation and collision effects.
     */
    animate() {
        setInterval(() => {
            if (!this.explodeBottle) {
                this.playAnimation(this.imagesRotating);
            } else {
                this.playAnimation(this.imagesHit);
            }
        }, 50);
    }

    /**
     * Plays the cracking sound when the bottle collides with an object, unless the game is muted.
     */
    playCrackingSound() {
        if (this.world.muteButton.currentImage !== this.world.muteButton.imageMute) {
            this.crackingSound.play();
            this.crackingSound.volume = 0.06;
        }
    }
}