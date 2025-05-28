class MuteUnmute extends DrawableObject {
    imageMute = 'img/mute.png';
    imageUnmute = 'img/unmute.png';

    /**
     * Creates an instance of the class and initializes the mute button state.
     * @param {World} world - The game world instance.
     */
    constructor(world) {
        super();
        this.world = world;
        this.currentImage = this.getInitialMuteState() ? this.imageMute : this.imageUnmute;
        this.loadImage(this.currentImage);
        this.y = 5;
        this.x = 685;
        this.height = 32;
        this.width = 32;
        this.addClickListener();
    }

    /**
     * Gets the initial mute state from local storage.
     * @returns {boolean} - True if muted, false otherwise.
     */
    getInitialMuteState() {
        const isMuted = localStorage.getItem('isMuted');
        return isMuted === 'true';
    }

    /**
     * Adds a click event listener to the canvas to handle mute/unmute toggling.
     */
    addClickListener() {
        canvas.addEventListener('click', (e) => {
            if (e.offsetX >= this.x && e.offsetX <= this.x + this.width &&
                e.offsetY >= this.y && e.offsetY <= this.y + this.height) {
                this.toggleImage();
                this.world.handleMuteToggle();
                this.saveMuteState();
            }
        });
    }

    /**
     * Toggles the image between mute and unmute states.
     */
    toggleImage() {
        this.currentImage = this.currentImage === this.imageUnmute ? this.imageMute : this.imageUnmute;
        this.loadImage(this.currentImage);
    }

    /**
     * Saves the current mute state to local storage.
     */
    saveMuteState() {
        const isMuted = this.currentImage === this.imageMute;
        localStorage.setItem('isMuted', isMuted);
    }
}