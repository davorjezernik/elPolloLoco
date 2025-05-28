class Character extends MovableObject {
    x = 80;
    y = 70;
    height = 256;
    width = 120;
    speed = 5;
    lastInteraction = new Date().getTime();
    isIdle = true;

    imagesWalking = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    imagesJumping = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    imagesIdle = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    imagesSleep = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    imagesHurt = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];

    imagesDead = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    walkingSound = new Audio('Audio/walking.mp3');
    jumpingAudio = new Audio('Audio/jumping.mp3');
    snoringAudio = new Audio('Audio/snoring.mp3');
    hurtAudio = new Audio('Audio/hitplayer.mp3');
    gameMusic = new Audio('Audio/music.mp3');
    gameOverMusic = new Audio ('Audio/gameover.mp3' );
    isMuted = false;

    /**
     * The offset for collision detection.
     * Adjust these values to fine-tune the collision bounding box.
     * @type {{top: number, bottom: number, left: number, right: number}}
     */
    offset = {
        top: 100,
        bottom: 1,
        left: 30,
        right: 40
    };

    /**
     * Creates a new `Character` instance.
     * Initializes the character's animations, applies gravity, and starts the game music.
     */
    constructor() {
        super().loadImage(this.imagesIdle[0]);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesJumping);
        this.loadImages(this.imagesIdle);
        this.loadImages(this.imagesSleep);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
        this.applyGravity();
        this.animate();
        this.playGameMusic();
        this.setupJumpInterval();
    }

    /**
     * Plays the game's background music.
     * The music is looped and set to a low volume.
     */
    playGameMusic() {
        this.gameMusic.pause();
        this.gameMusic.currentTime = 0;
        this.gameMusic.volume = 0.005;
        this.gameMusic.loop = true;
        this.gameMusic.play();
    }

    /**
     * Toggles the mute state of all game sounds.
     */
    toggleMute() {
        this.isMuted = !this.isMuted;
        this.updateSoundStates();
    }

    /**
     * Updates the mute state of all game sounds based on the `isMuted` property.
     */
    updateSoundStates() {
        const sounds = [this.walkingSound, this.jumpingAudio, this.snoringAudio, this.hurtAudio, this.gameMusic];
        sounds.forEach(sound => {
            sound.muted = this.isMuted;
        });
    }

    /**
     * Plays the walking sound if the character is moving and the sound is not muted.
     */
    playWalkingSound() {
        if (!this.isMuted && this.walkingSound.paused && !this.world.isGameOver && !this.world.isGameWon) {
            this.walkingSound.currentTime = 0;
            this.walkingSound.play();
            this.walkingSound.volume = 0.1;
        }
    }

    /**
     * Stops the walking sound if it is currently playing.
     */
    stopWalkingSound() {
        if (!this.walkingSound.paused) {
            this.walkingSound.pause();
            this.walkingSound.currentTime = 0;
        }
    }

    /**
     * Plays the snoring sound if the character is idle and the sound is not muted.
     */
    playSnoringSound() {
        if (!this.isMuted && this.snoringAudio.paused) {
            this.snoringAudio.currentTime = 0;
            this.snoringAudio.play();
        }
    }

    /**
     * Stops the snoring sound if it is currently playing.
     */
    stopSnoringSound() {
        this.snoringAudio.pause();
        this.snoringAudio.currentTime = 0;
        this.snoringAudio.volume = 0.1;
    }

    /**
     * Plays the hurt sound if the character is hurt and the sound is not muted.
     */
    playHurtSound() {
        if (!this.isMuted && this.hurtAudio.paused) {
            this.hurtAudio.currentTime = 0;
            this.hurtAudio.play();
            this.hurtAudio.volume = 0.04;
        }
    }

    /**
     * Resets the character's state to idle and stops any walking or snoring sounds.
     */
    resetState() {
        this.isIdle = true;
        this.stopWalkingSound();
        this.stopSnoringSound();
    }

    /**
     * Resets all game sounds to their initial state.
     */
    resetSounds() {
        this.walkingSound.pause();
        this.jumpingAudio.pause();
        this.snoringAudio.pause();
        this.hurtAudio.pause();
        this.gameMusic.pause();
        this.walkingSound.currentTime = 0;
        this.jumpingAudio.currentTime = 0;
        this.snoringAudio.currentTime = 0;
        this.hurtAudio.currentTime = 0;
        this.gameMusic.currentTime = 0;
    }

    /**
     * Handles the character's animation and movement logic.
     * This method is called repeatedly to update the character's state.
     */
    animate() {
        this.setupMovementInterval();
        this.setupAnimationInterval();
    }

    /**
     * Sets up an interval to handle character movement.
     * Runs at approximately 60 frames per second.
     * Updates movement and camera position if the game is not over or won.
     */
    setupMovementInterval() {
        setInterval(() => {
            if (this.world.isGameOver || this.world.isGameWon) return;
            this.handleMovement();
            this.world.cameraX = -this.x + 100;
        }, 1000 / 60);
    }

    /**
     * Sets up an interval to handle character animations.
     * Runs every 80 milliseconds.
     * Updates animation if the game is not over or won.
     */
    setupAnimationInterval() {
        setInterval(() => {
            if (this.world.isGameOver || this.world.isGameWon) return;
            this.handleAnimation();
        }, 120);
    }

    /**
     * Sets up a separate interval to handle the character's jump logic.
     * Runs at approximately 60 frames per second.
     */
    setupJumpInterval() {
        setInterval(() => {
            if (this.world.isGameOver || this.world.isGameWon) return;
            this.handleJump();
        }, 1000 / 20);
    }

    /**
     * Handles character movement.
     * - Calls `handleHorizontalMovement()` to check for left/right movement.
     * - Sets the character to idle if no movement occurs.
     */
    handleMovement() {
        let isMoving = this.handleHorizontalMovement();
        if (!isMoving) this.isIdle = true;
    }

    /**
     * Handles the character's jump action.
     * - Calls `jump()` to make the character jump.
     * - Resets idle state to indicate activity.
     */
    handleJump() {
        if (this.world.keyboard.SPACE) {
            this.jump();
            this.resetIdleState();
        }
    }

    /**
     * Handles left and right movement based on keyboard input.
     * - Moves the character right if the RIGHT key is pressed and within bounds.
     * - Moves the character left if the LEFT key is pressed and within bounds.
     * - Stops the walking sound if no movement occurs.
     *
     * @returns {boolean} Returns `true` if the character is moving, otherwise `false`.
     */
    handleHorizontalMovement() {
        let isMoving = false;
        if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
            this.moveCharacter('right');
            isMoving = true;
        } else if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveCharacter('left');
            isMoving = true;
        } else {
            this.stopWalkingSound();
        }
        return isMoving;
    }

    /**
     * Moves the character in the specified direction.
     * - Moves right or left based on the provided direction.
     * - Updates the character's direction flag.
     * - Resets idle state and plays the walking sound if the character is on the ground.
     *
     * @param {string} direction - The direction to move (`"right"` or `"left"`).
     */
    moveCharacter(direction) {
        if (direction === 'right') {
            this.moveRight();
            this.otherDirection = false;
        } else if (direction === 'left') {
            this.moveLeft();
            this.otherDirection = true;
        }
        this.resetIdleState();
        if (!this.isInAir()) this.playWalkingSound();
    }

    /**
     * Resets the character's idle state and stops the snoring sound.
     */
    resetIdleState() {
        this.lastInteraction = new Date().getTime();
        this.isIdle = false;
        this.stopSnoringSound();
    }

    /**
     * Handles the character's animation based on its current state.
     * - Plays the death animation and triggers the game over screen if the character is dead.
     * - Plays the hurt animation and sound if the character is hurt.
     * - Plays the jumping animation if the character is in the air.
     * - Calls `handleIdleAndWalkingAnimation()` for idle and walking animations.
     */
    handleAnimation() {
        if (this.isDead()) {
            this.playAnimation(this.imagesDead);
            setTimeout(() => {
                showGameOverScreen();
                this.playGameOverMusic(); 
            }, 100);
        } else if (this.isHurt()) {
            this.playHurtSound();
            this.playAnimation(this.imagesHurt);
        } else if (this.isInAir()) {
            this.stopWalkingSound();
            this.playAnimation(this.imagesJumping);
        } else {
            this.handleIdleAndWalkingAnimation();
        }
    }

    /**
     * Plays the game over music when the character dies.
     */
    playGameOverMusic() {
        if (!this.isMuted && this.gameOverMusic.paused) {
            this.gameOverMusic.currentTime = 0;
            this.gameOverMusic.play();
            this.gameOverMusic.volume = 0.1; 
        }
    }

    /**
     * Handles the character's idle and walking animations based on the time since the last interaction.
     */
    handleIdleAndWalkingAnimation() {
        const timeSinceLastInteraction = (new Date().getTime() - this.lastInteraction) / 1000;
        if (this.isIdle) {
            if (timeSinceLastInteraction >= 5) {
                this.playAnimation(this.imagesSleep);
                this.playSnoringSound();
            } else if (timeSinceLastInteraction >= 0.5) {
                this.playAnimation(this.imagesIdle);
                this.stopSnoringSound();
            }
        } else {
            this.playAnimation(this.imagesWalking);
        }
    }

    /**
     * Makes the character jump if it is not already in the air.
     */
    jump() {
        if (!this.isInAir()) {
            this.speedY = 13;
            this.stopWalkingSound();
            if (!this.isMuted) {
                this.jumpingAudio.currentTime = 0;
                this.jumpingAudio.play();
                this.jumpingAudio.volume = 0.03;
            }
        }
    }

    /**
     * Starts the jump animation for the character.
     */
    startJumpAnimation() {
        this.playAnimation(this.imagesJumping);
    }
}