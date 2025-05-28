class Chicken extends MovableObject {
    height = 64;
    width = 56;
    y = 365;
    health = 20;

    imagesWalking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    imagesDead = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    audioHit = new Audio('Audio/chickendead.mp3');
    isMuted = false;

    /**
     * The offset for collision detection.
     * Adjust these values to fine-tune the collision bounding box.
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 1,    
        bottom: 10, 
        left: 20,   
        right: 20   
    };

    /**
     * Creates a new `Chicken` instance.
     * @param {number} x - The x-coordinate where the chicken will be placed on the canvas.
     */
    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.imagesWalking);
        this.loadImage(this.imagesDead);
        this.x = x;
        this.speed = 0.15 + Math.random() * 0.8;
        this.animate();
    }

    /**
     * Toggles the mute state of the chicken's sound.
     */
    toggleMute() {
        this.isMuted = !this.isMuted;
        this.updateSoundStates();
    }

    /**
     * Updates the mute state of the chicken's sound based on the `isMuted` property.
     */
    updateSoundStates() {
        const sounds = [this.audioHit];
        sounds.forEach(sound => {
            sound.muted = this.isMuted;
        });
    }

    /**
     * Handles the chicken's animation and movement logic.
     * This method is called repeatedly to update the chicken's state.
     */
    animate() {
        setInterval(() => {
            if (!this.isAlive) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isAlive) {
                this.playAnimation(this.imagesWalking);
            }
        }, 200);

        let soundPlayed = false;
        setInterval(() => {
            if (this.isDead() && !soundPlayed) {
                this.loadImage(this.imagesDead);
                this.audioHit.play();
                this.audioHit.volume = 0.06;
                soundPlayed = true;
                setTimeout(() => {
                    this.audioHit.pause();
                }, this.audioHit.duration * 1000);
            }
        }, 100);
    }
}