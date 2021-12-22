import MovingDirection from '../core/game/MovingDirection.js'

export default class Ghost {

    constructor(x, y, tileSize, velocity, tileMap) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;

        this.#loadImages();

        this.movingDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length);

        this.directionTimerDefault = this.#random(10, 50);
    }

    draw (ctx) {
        this.#move();
        ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize)
    }

    #move() {
        if (!this.tileMap.didCollideWithEnvironment(this.x, this.y, this.movingDirection)) {
            switch(this.movingDirection) {
                case MovingDirection.up:
                    this.y -= this.velocity;
                    break;

                case MovingDirection.up:
                    this.y += this.velocity;
                    break;

                case MovingDirection.left:
                    this.x -= this.velocity;
                    break;

                case MovingDirection.right:
                    this.x += this.velocity;
                    break;
            }
        }
    }

    #random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    #loadImages () {
        this.normalGhost = new Image();
        this.normalGhost.src = '/app/style/graphics/ghost.png';

        this.scaredGhost = new Image();
        this.scaredGhost.src = '/app/style/graphics/scaredGhost.png';

        this.scaredGhost2 = new Image();
        this.scaredGhost2.src = '/app/style/graphics/scaredGhost2.png';

        this.image = this.normalGhost;
    }
}