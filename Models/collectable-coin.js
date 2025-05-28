class colletabelCoin extends MovableObject {
    imagesCoin = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    audioCoin = new Audio('Audio/coincollect.mp3');
    isMuted = false;

    /**
     * The offset for collision detection.
     * Adjust these values to fine-tune the collision bounding box.
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 40,    
        bottom: 40, 
        left: 40,   
        right: 40   
    };

    /**
     * Creates an instance of colletabelCoin.
     * @param {number} x - The x-coordinate of the coin.
     * @param {number} y - The y-coordinate of the coin.
     */
    constructor(x, y, isMuted = false) {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.imagesCoin);
        this.x = x;
        this.y = y;
        this.height = 128;
        this.width = 128;
        this.isMuted = isMuted; 
        this.animate();
    }
    
    /**
     * Plays sound for coins when collected
     */
    playCoinSound() {
        if (!this.isMuted) {
            this.audioCoin.currentTime = 0; 
            this.audioCoin.play();
            this.audioCoin.volume = 0.005;
        }
    }

    /**
     * Toggles the mute state for the coin sound.
     */
    toggleMute() {
        this.isMuted = !this.isMuted;
    }
    
    /**
     * Animates the coin by alternating between images.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.imagesCoin);
        }, 200);
    }
}