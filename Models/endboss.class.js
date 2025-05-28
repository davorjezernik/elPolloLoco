class EndBoss extends MovableObject {
    height = 300;
    width = 250;
    y = 135;
    x = 3500;    

    imagesAlert = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    imagesWalking = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    imagesHit = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    imagesAttack = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    imagesDead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    world;
    audioHit = new Audio('Audio/chikenhurt.mp3');
    audioWin = new Audio('Audio/win.mp3');
    isMuted = false; 

    /**
     * Creates an instance of EndBoss.
     * @param {object} world - The game world reference.
     */
    constructor(world) {
        super().loadImage(this.imagesAlert[0]);
        this.world = world; 
        this.loadImages(this.imagesAlert);
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesHit);
        this.loadImages(this.imagesAttack);
        this.loadImages(this.imagesDead);
    }

    /**
     * Clears all active animation intervals.
     */
    clearAllIntervals() {
        clearInterval(this.intervalAlert);
        clearInterval(this.intervalWalking);
        clearInterval(this.intervalHurt);
    }

    /**
     * Animates the alert sequence of the boss.
     */
    animateAlert() {
        this.clearAllIntervals();
        this.intervalAlert = setInterval(() => {
            this.playAnimation(this.imagesAlert);
        }, 200);
        setTimeout(() => {
            clearInterval(this.intervalAlert); 
            this.animateWalking(); 
        }, 1700); 
    }

    /**
     * Animates the walking sequence of the boss.
     */
    animateWalking() {
        if (world.bossTriggered) {
            this.clearAllIntervals();
            this.intervalWalking = setInterval(() => {
                this.playAnimation(this.imagesWalking);
                this.moveLeft(); 
                this.audioHit.pause();
            }, 200);
        }
    }

    /**
     * Animates the hurt sequence of the boss.
     */
    animateHurt() {
        if (!world.bossHit) return;
        this.clearAllIntervals();
        this.intervalHurt = setInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.imagesHit);
                if (!this.isMuted) this.audioHit.play();
                this.audioHit.volume = 0.02;
            } else {
                this.playAnimation(this.imagesDead);
                this.audioHit.pause();
            }
        }, 200);
        setTimeout(() => {
            clearInterval(this.intervalHurt);
            if (!this.isDead()) this.animateAttack();
            world.bossHit = false;
        }, 1000);
    }

    /**
     * Animates the attack sequence of the boss.
     */
    animateAttack() {
        this.clearAllIntervals();
        this.intervalAttack = setInterval(() => {
            this.playAnimation(this.imagesAttack);
            this.moveAttack();
        }, 100);   
        setTimeout(() => {
            clearInterval(this.intervalAttack);
            if (!this.isDead()) {
                this.animateWalking(); 
            }
        }, 1000); 
    }
    
    /**
     * Animates the death sequence of the boss.
     */    
    animateDead() {
        if (this.isDead()) {
            this.clearAllIntervals();
            this.intervalDead = setInterval(() => {
                this.playAnimation(this.imagesDead);
            }, 200);
            if (!this.isMuted && this.audioWin.paused) {
                this.audioWin.currentTime = 0; 
                this.audioWin.play();
                this.audioWin.volume = 0.1;
            }
            setTimeout(() => {
                clearInterval(this.intervalDead);
            }, 800); 
        }
    }

    /**
     * Moves the boss to the left.
     */
    moveLeft() {
        this.x -= 5; 
    }

    /**
     * Moves the boss forward during an attack.
     */
    moveAttack() {
        this.x -= 24; 
    }
 
    /**
     * Toggles the mute state of the boss sounds.
     */
    toggleMute() {
        this.isMuted = !this.isMuted;
        this.updateSoundStates();
    }
 
    /**
     * Updates the sound states based on mute status.
     */
    updateSoundStates() {
        this.audioHit.muted = this.isMuted;
    }
}
