class smallChicken extends MovableObject {
    height = 40;
    width = 40;
    y = 385;
    health = 20;
    
    imagesWalking = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    imagesDead = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /** @type {Object} The offset values for collision detection. */
    offset = {
        top: 2,    
        bottom: 5, 
        left: 15,   
        right: 15   
    };

    audioHit = new Audio('Audio/chickendead.mp3');
    isMuted = false;

    /**
     * Creates an instance of a small chicken.
     * @param {number} x - The initial x-coordinate of the small chicken.
     */
    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.imagesWalking);
        this.loadImage(this.imagesDead);
        this.x = x;
        this.speed = 0.15 + Math.random() * 1.25;
        this.animate();
    }

    /**
     * Toggles the mute state of the chicken's sounds.
     */
    toggleMute() {
        this.isMuted = !this.isMuted;
        this.updateSoundStates();
    }

    /**
     * Updates the mute state of all sounds associated with the chicken.
     */
    updateSoundStates() {
        const sounds = [this.audioHit];
        sounds.forEach(sound => {
            sound.muted = this.isMuted;
        });
    }

    /**
     * Handles the animation and movement of the small chicken.
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