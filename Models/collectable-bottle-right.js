class colletabelBottlRight extends DrawableObject {
    imagesBottles = [
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    audioBottle = new Audio('Audio/bottlecolect.mp3');
    isMuted = false;

    /**
     * The offset for collision detection.
     * Adjust these values to fine-tune the collision bounding box.
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 10,    
        bottom: 10, 
        left: 20,   
        right: 20   
    };

    /**
     * Creates an instance of colletabelBottlRight.
     * @param {number} x - The x-coordinate of the bottle.
     */
    constructor(x, isMuted = false) {
        super();
        this.loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        this.loadImages(this.imagesBottles);
        this.x = x;
        this.y = 350;
        this.width = 80;
        this.height = 80;
        this.isMuted = isMuted;
    }

    /**
     * Plays the bottle collection sound if not muted.
     */
    playBottleSound() {
        if (!this.isMuted) {
            this.audioBottle.currentTime = 0; 
            this.audioBottle.play();
            this.audioBottle.volume = 0.09;
        }
    }
    
    /**
     * Toggles the mute state for the bottle sound.
     */
    toggleMute() {
        this.isMuted = !this.isMuted;
    }
}
