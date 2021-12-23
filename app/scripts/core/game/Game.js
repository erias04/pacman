import TileMap from '../map/TileMap.js'

const tileSize = 32;
// How many tiles PacMan moves
const velocity = 2;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velocity);
const ghosts = tileMap.getGhosts(velocity);

let gameOver = false;
let gameWin = false;

const gameOverSound = new Audio('/app/style/audio/gameOver.wav');
const gameWinSound = new Audio('/app/style/audio/gameWin.wav');

function gameLoop() {
    tileMap.draw(ctx);
    pacman.draw(ctx, pause(), ghosts);
    ghosts.forEach(ghosts => ghosts.draw(ctx, pause(), pacman));
    checkGameOver();
}

function checkGameOver() {
    if (!gameOver) {
        gameOver = isGameOver();
        if (gameOver) {
            gameOverSound.play();
        }
    }

}

function isGameOver() {
    return ghosts.some(ghost => !pacman.powerDotActive && ghost.collideWith(pacman))
}

function pause() {
    return !pacman.madeFirstMove || gameOver;
}

tileMap.setCanvasSize(canvas);

setInterval(gameLoop, 1000 / 75);