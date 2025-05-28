class World {
    character = new Character();
    bottle = new ThrowableObject();
    level = level1;
    canvas;
    ctx;
    keyboard;
    cameraX = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    muteButton = new MuteUnmute();
    statusBarHealthEndBoss = new StatusBarEndBoss(this.endboss);
    throwableObject = [];
    coinCount = 0;
    bottleCount = 0;
    lastThrowTime = 0;
    bossTriggered = false;
    bossHit = false;
    endboss = new EndBoss();
    isGameOver = false;
    isGameWon = false;

    /**
     * Initializes the game world.
     * @constructor
     * @param {HTMLCanvasElement} canvas - The canvas element used for rendering the game.
     * @param {Keyboard} keyboard - The keyboard input handler for the game.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.muteButton = new MuteUnmute(this);
        this.applySavedMuteState();
        this.draw();
        this.setWorld();
        this.endboss = this.level.enemies.find(enemy => enemy instanceof EndBoss);
        this.statusBarHealthEndBoss = new StatusBarEndBoss(this.endboss);
        this.runInterval();
    }

    /**
     * Applies the saved mute state from localStorage.
     */
    applySavedMuteState() {
        const isMuted = localStorage.getItem('isMuted') === 'true';
        if (isMuted) {
            this.handleMuteToggle();
        }
    }

    /**
     * Toggles the mute state for the character, enemies, and throwable objects.
     */
    handleMuteToggle() {
        this.character.toggleMute();
        this.level.enemies.forEach(enemy => enemy.toggleMute());
        this.throwableObject.forEach(bottle => bottle.isMuted = !bottle.isMuted);
        this.level.coin.forEach(coin => coin.toggleMute());
        this.level.bottlesRight.forEach(bottle => bottle.toggleMute()); 
        this.level.bottlesLeft.forEach(bottle => bottle.toggleMute()); 
    }

    /**
     * Toggles mute
     */
    toggleMute() {
        this.isMuted = !this.isMuted;
    }

    /**
     * Stops all sounds in the game, including character, enemy, and throwable object sounds.
     */
    stopAllSounds() {
        const stopSound = (sound) => {
            if (sound) {
                sound.pause();
                sound.currentTime = 0;
            }
        };
        stopSound(this.character.sound);
        this.character.stopWalkingSound();
        this.character.stopSnoringSound();
        this.level.enemies.forEach(enemy => stopSound(enemy.sound));
        this.throwableObject.forEach(bottle => stopSound(bottle.sound));
    }

    /**
     * Stops the background music.
     */
    stopBackgroundMusic() {
        if (this.character.gameMusic) {
            this.character.gameMusic.pause();
            this.character.gameMusic.currentTime = 0;
        }
    }

    /**
     * Displays the game over screen and stops all sounds and music.
     */
    showGameOverScreen() {
        document.getElementById('gameOverScreen').style.display = 'block';
        this.stopBackgroundMusic();
        this.stopAllSounds();
        this.character.playGameOverMusic(); 
    }

    /**
     * Displays the win screen, stops all sounds and music, and sets the game as won.
     */
    showWinScreen() {
        document.getElementById('winScreen').style.display = 'block';
        this.stopBackgroundMusic();
        this.stopAllSounds();
        this.isGameWon = true;
        if (this.endboss && this.endboss.intervalDead) {
            clearInterval(this.endboss.intervalDead);
        }
    }

    /**
     * Stops the game, resets the character state, and clears the game interval.
     */
    stopGame() {
        this.isGameOver = true;
        this.stopBackgroundMusic();
        this.stopAllSounds();
        this.character.resetState();
        resetKeyboard();
        clearInterval(this.gameInterval);
    }

    /**
     * Sets the world reference for the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Runs the main game loop at a fixed interval.
     */
    runInterval() {
        this.gameInterval = setInterval(() => {
            if (this.isGameOver) return;
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollisionsWithBottle();
            this.checkCollisionCoin();
            this.checkCollisionBottleRight();
            this.checkCollisionBottleLeft();
            this.triggerBoss();
        }, 100);
    }

    /**
     * Checks if the character can throw a bottle and handles the throwing logic.
     */
    checkThrowObjects() {
        if (this.bottleCount >= 20) {
            let currentTime = new Date().getTime();
            if (this.keyboard.D && currentTime - this.lastThrowTime >= 1800) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this);
                this.throwableObject.push(bottle);
                this.bottleCount -= 20;
                this.statusBarBottle.setPercentage(this.bottleCount);
                this.lastThrowTime = currentTime;
            }
        }
    }

    /**
     * Triggers the boss fight when the character reaches a certain position.
     */
    triggerBoss() {
        if (!this.bossTriggered && this.character.x >= 3100) {
            this.level.enemies.forEach(enemy => {
                if (enemy instanceof EndBoss) {
                    enemy.animateAlert();
                }
            });
            this.bossTriggered = true;
        }
    }

    /**
     * Checks for collisions between the character and enemies.
     */
    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.handleCharacterCollision(enemy);
            }
        });
    }

    /**
     * Handles the character's collision with an enemy.
     * @param {Enemy} enemy - The enemy the character collided with.
     */
    handleCharacterCollision(enemy) {
        if (!this.character.isInAir()) {
            this.character.hit();
            this.statusBarHealth.setPercentage(this.character.health);
        } else if (this.character.speedY < 0) {
            this.handleAirCollision(enemy);
        }
    }

    /**
     * Handles the character's collision with an enemy while in the air.
     * @param {Enemy} enemy - The enemy the character collided with.
     */
    handleAirCollision(enemy) {
        if (enemy instanceof Chicken || enemy instanceof smallChicken) {
            enemy.hit();
            enemy.cancelAnimationAfterDead();
            this.character.bouncFromChicken();
            this.removeChickenAfterDeath(enemy);
            this.character.startJumpAnimation();
        }
    }

    /**
     * Checks for collisions between throwable objects and enemies.
     */
    checkCollisionsWithBottle() {
        this.throwableObject.forEach(bottle => {
            if (bottle.hasCollided) return;
            this.level.enemies.forEach(enemy => {
                if (bottle.isColliding(enemy)) {
                    this.handleBottleCollision(bottle, enemy);
                }
            });
        });
    }

    /**
     * Handles the collision between a throwable object and an enemy.
     * @param {ThrowableObject} bottle - The throwable object that collided.
     * @param {Enemy} enemy - The enemy that was hit.
     */
    handleBottleCollision(bottle, enemy) {
        bottle.hasCollided = true;
        bottle.explodeBottle = true;
        if (!this.isMuted) bottle.playCrackingSound();      
        enemy.hit();
        if (enemy instanceof Chicken) {
            this.removeChickenAfterDeath(enemy);
        } else if (enemy instanceof EndBoss) {
            this.handleEndBossHit(enemy);
        }
        this.removeBottleAfterCollision(bottle);
    }
    
    /**
     * Handles the collision between a throwable object and Endboss.
     */
    handleEndBossHit(enemy) {
        this.bossHit = true;
        this.health -= 20;
        this.statusBarHealthEndBoss.setPercentage(this.endboss.health);
        enemy.animateHurt();
        if (enemy.isDead()) {
            enemy.animateDead(); 
            setTimeout(() => this.showWinScreen(), 1000);
        }
    }
    

    /**
     * Checks for collisions between the character and coins.
     */
    checkCollisionCoin() {
        this.level.coin.forEach(coin => {
            if (this.character.isColliding(coin)) {
                this.coinCount += 20;
                coin.playCoinSound(); 
                this.removeCoinAfterCollision(coin);
                this.statusBarCoin.setPercentage(this.coinCount);
            }
        });
    }

    /**
     * Checks for collisions between the character and bottles on the right side.
     */
    checkCollisionBottleRight() {
        this.level.bottlesRight.forEach(bottlesRight => {
            if (this.character.isColliding(bottlesRight)) {
                this.bottleCount += 20;
                bottlesRight.playBottleSound(); 
                this.removeBottleRightAfterCollision(bottlesRight);
                this.statusBarBottle.setPercentage(this.bottleCount);
            }
        });
    }

    /**
     * Checks for collisions between the character and bottles on the left side.
     */
    checkCollisionBottleLeft() {
        this.level.bottlesLeft.forEach(bottlesLeft => {
            if (this.character.isColliding(bottlesLeft)) {
                this.bottleCount += 20;
                bottlesLeft.playBottleSound(); 
                this.removeBottleLeftAfterCollision(bottlesLeft);
                this.statusBarBottle.setPercentage(this.bottleCount);
            }
        });
    }

    /**
     * Removes a chicken enemy from the game after it dies.
     * @param {Enemy} enemy - The chicken enemy to remove.
     */
    removeChickenAfterDeath(enemy) {
        setTimeout(() => {
            this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
        }, 200);
    }

    /**
     * Removes a throwable object from the game after it collides.
     * @param {ThrowableObject} bottle - The throwable object to remove.
     */
    removeBottleAfterCollision(bottle) {
        setTimeout(() => {
            this.throwableObject.splice(this.throwableObject.indexOf(bottle), 1);
        }, 200);
    }

    /**
     * Removes a coin from the game after it is collected.
     * @param {Coin} coin - The coin to remove.
     */
    removeCoinAfterCollision(coin) {
        setTimeout(() => {
            this.level.coin.splice(this.level.coin.indexOf(coin), 1);
        }, 10);
    }

    /**
     * Removes a bottle from the right side after it is collected.
     * @param {Bottle} bottlesRight - The bottle to remove.
     */
    removeBottleRightAfterCollision(bottlesRight) {
        setTimeout(() => {
            this.level.bottlesRight.splice(this.level.bottlesRight.indexOf(bottlesRight), 1);
        });
    }

    /**
     * Removes a bottle from the left side after it is collected.
     * @param {Bottle} bottlesLeft - The bottle to remove.
     */
    removeBottleLeftAfterCollision(bottlesLeft) {
        setTimeout(() => {
            this.level.bottlesLeft.splice(this.level.bottlesLeft.indexOf(bottlesLeft), 1);
        });
    }

    /**
     * Draws the game world on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context for the canvas.
     */
    draw(ctx) {
        if (this.isGameOver) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0);
        this.addObjectsToMap(this.level.backgroundObject);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.cameraX, 0);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.muteButton);
        this.ctx.translate(this.cameraX, 0);
        this.addToMap(this.character);
        this.addToMap(this.statusBarHealthEndBoss);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottlesLeft);
        this.addObjectsToMap(this.level.bottlesRight);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.throwableObject);
        this.ctx.translate(-this.cameraX, 0);
        if (!this.isGameOver) {
            let self = this;
            requestAnimationFrame(() => self.draw());
        }
    }

    /**
     * Adds multiple objects to the game map.
     * @param {Array} objects - An array of objects to add to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o));
    }

    /**
     * Adds a single object to the game map.
     * @param {Object} mo - The object to add to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips an image horizontally for rendering.
     * @param {Object} mo - The object whose image should be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores an image to its original orientation after flipping.
     * @param {Object} mo - The object whose image should be restored.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}