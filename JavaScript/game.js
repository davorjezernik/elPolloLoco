let canvas;
let world;
let keyboard = new Keyboard();
let startScreen = document.getElementById('startScreen');
let canvasElement = document.getElementById('canvas');
let info = document.getElementById('howToPlayScreen');
let mobileButtons = document.getElementById('mobileButtons');
let rotateDeviceScreen = document.getElementById('rotateDeviceScreen');
let gameStarted = false;

info.style.display = 'none';
mobileButtons.style.display = 'none';

/**
 * Checks if the device supports touch events.
 * @returns {boolean} True if the device is a touch device, otherwise false.
 */
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Toggles the visibility of mobile buttons based on whether the game has started and the device is a touch device.
 */
function toggleMobileButtons() {
    const mobileButtons = document.getElementById('mobileButtons');
    if (mobileButtons) {
        if (gameStarted && isTouchDevice()) {
            mobileButtons.style.display = 'flex';
        } else {
            mobileButtons.style.display = 'none';
        }
    }
}

/**
 * Event listener for DOM content loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('resize', toggleMobileButtons);
    addMobileControls(); 
});

/**
 * Starts the game by initializing the level, displaying the canvas, and hiding the start screen.
 */
function startGame() {
    gameStarted = true;
    rotateDeviceScreen.style.display = 'none';
    startScreen.style.display = 'none';
    canvasElement.style.display = 'block';
    toggleMobileButtons(); 
    initLevel();
    init();
}

/**
 * Displays the "How to Play" screen and hides the start screen.
 */
function howToPlay() {
    info.style.display = 'block';
    startScreen.style.display = 'none';
}

/**
 * Returns to the start screen from the "How to Play" screen.
 */
function back() {
    info.style.display = 'none';
    startScreen.style.display = 'block';
}

/**
 * Initializes the game world and canvas.
 */
function init() {
    canvas = canvasElement;
    world = new World(canvas, keyboard);
}

/**
 * Restarts the game by resetting the game world, stopping all sounds, and reinitializing the level.
 */
function restartGame() {
    document.getElementById('gameOverScreen').style.display = 'none';
    document.getElementById('winScreen').style.display = 'none';
    if (world) {
        world.stopAllSounds();
        world.stopBackgroundMusic();
        world.character.resetSounds();
        world = null;
    }
    initLevel();
    init();
    if (world && world.backgroundMusic) {
        world.backgroundMusic.currentTime = 0;
        world.backgroundMusic.play();
    }
}

/**
 * Stops the game by setting the game over state and stopping all sounds and background music.
 */
function stopGame() {
    if (world) {
        world.isGameOver = true;
        world.stopBackgroundMusic();
        world.stopAllSounds();
    }
    keyboard = new Keyboard();
}

/**
 * Resets the keyboard state by setting all keys to false.
 */
function resetKeyboard() {
    keyboard.LEFT = false;
    keyboard.RIGHT = false;
    keyboard.UP = false;
    keyboard.DOWN = false;
    keyboard.SPACE = false;
    keyboard.D = false;
}

/**
 * Prevent context menu on mobile buttons
 */
document.querySelectorAll('#leftButton, #rightButton, #jumpButton, #throwButton').forEach(button => {
    button.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});

/**
 * Left Button control mobile
 */
function addLeftButtonControls() {
    const leftButton = document.getElementById('leftButton');   
    leftButton.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    }, { passive: false });
    leftButton.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    }, { passive: false });
}

/**
 * Right Button control mobile
 */
function addRightButtonControls() {
    const rightButton = document.getElementById('rightButton');  
    rightButton.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    }, { passive: false });
    rightButton.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    }, { passive: false });
}

/**
 * Jump Button control mobile
 */
function addJumpButtonControls() {
    const jumpButton = document.getElementById('jumpButton'); 
    jumpButton.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    }, { passive: false });
    jumpButton.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    }, { passive: false });
}

/**
 * Throw Button control mobile
 */
function addThrowButtonControls() {
    const throwButton = document.getElementById('throwButton');  
    throwButton.addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    }, { passive: false });
    throwButton.addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    }, { passive: false });
}

/**
 * Adds touch event listeners to mobile buttons.
 */
function addMobileControls() {
    addLeftButtonControls();
    addRightButtonControls();
    addJumpButtonControls();
    addThrowButtonControls();
}

/**
 * Keyboard event listeners
 */
window.addEventListener('keydown', (event) => {
    if (world && (world.isGameOver || world.isGameWon)) return;
    if (event.keyCode == 37) keyboard.LEFT = true;
    if (event.keyCode == 38) keyboard.UP = true;
    if (event.keyCode == 39) keyboard.RIGHT = true;
    if (event.keyCode == 40) keyboard.DOWN = true;
    if (event.keyCode == 32) keyboard.SPACE = true;
    if (event.keyCode == 68) keyboard.D = true;
});

/**
 * Checks the device orientation and displays a message if the device is in portrait mode on small screens.
 */
window.addEventListener('keyup', (event) => {
    if (event.keyCode == 37) keyboard.LEFT = false;
    if (event.keyCode == 38) keyboard.UP = false;
    if (event.keyCode == 39) keyboard.RIGHT = false;
    if (event.keyCode == 40) keyboard.DOWN = false;
    if (event.keyCode == 32) keyboard.SPACE = false;
    if (event.keyCode == 68) keyboard.D = false;
});

/**
 * Event listeners for buttons
 */
document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('howToPlayButton').addEventListener('click', howToPlay);
document.getElementById('backButton').addEventListener('click', back);

/**
 * Win screen
 */
window.showWinScreen = function () {
    document.getElementById('winScreen').style.display = 'block';
    world.stopGame();
    resetKeyboard();
};

/**
 * GameOver screen
 */
window.showGameOverScreen = function () {
    document.getElementById('gameOverScreen').style.display = 'block';
    world.stopGame();
    resetKeyboard();
};

/**
 * Checks the device orientation and displays a message if the device is in portrait mode on small screens.
 */
function checkOrientation() {
    if (window.innerWidth <= 1000) {
        if (window.matchMedia("(orientation: portrait)").matches) {
            rotateDeviceScreen.style.display = 'flex';
            document.body.classList.add('no-scroll');
        } else {
            rotateDeviceScreen.style.display = 'none';
            document.body.classList.remove('no-scroll');
        }
    } else {
        rotateDeviceScreen.style.display = 'none';
        document.body.classList.remove('no-scroll');
    }
    if (gameStarted) {
        startScreen.style.display = 'none';
    }
}

/**
 * Cheks if the device is in landscape mode and displays a message if it is.
 */
checkOrientation();
window.addEventListener('resize', checkOrientation);
window.addEventListener('orientationchange', checkOrientation);

