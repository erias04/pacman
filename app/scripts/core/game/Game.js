import TileMap from '../map/TileMap.js'

const tileSize = 32;
// How many tiles PacMan moves
const velocity = 2;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const tileMap = new TileMap(tileSize);
const pacman = tileMap.getPacman(velocity);
const ghosts = tileMap.getGhosts(velocity);

function gameLoop() {
    tileMap.draw(ctx);
    pacman.draw(ctx);
    ghosts.forEach(ghosts => ghosts.draw(ctx, pause()));
}

function pause() {
    return !pacman.madeFirstMove;
}

tileMap.setCanvasSize(canvas);

setInterval(gameLoop, 1000 / 75)