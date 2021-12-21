const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function gameLoop() {
    // console.log(75);
}

setInterval(gameLoop, 1000 / 75)

export default class TileMap{
    constructor(tileSize) {
        this.tileSize = tileSize;
    }

    draw() {
        console.log('draw')
    }
}

