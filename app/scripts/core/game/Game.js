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
    drawGameEnd();
    pacman.draw(ctx, pause(), ghosts);
    ghosts.forEach(ghosts => ghosts.draw(ctx, pause(), pacman));
    checkGameOver();
    checkGameWin();
}

function checkGameWin() {
    if (!gameWin) {
        gameWin  = tileMap.didWin();
        if (gameWin) {
            gameWinSound.play();
        }
    }
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
    return !pacman.madeFirstMove || gameOver || gameWin;
}

function drawGameEnd() {
    if(gameOver || gameWin) {
        let text = ' You Win!';
        if(gameOver) {
            text = ' Game Over!';
        }
        ctx.fillStyle = 'black';
        ctx.fillRect(0, canvas.height / 3.2, canvas.width, 80);

        ctx.font = "80px comic sans";
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop('0', 'magenta');
        gradient.addColorStop('0.5', 'blue');
        gradient.addColorStop('1.0', 'red');

        ctx.fillStyle = gradient;
        ctx.fillText(text, 10, canvas.height / 2);
    }
}

tileMap.setCanvasSize(canvas);

setInterval(gameLoop, 1000 / 75);