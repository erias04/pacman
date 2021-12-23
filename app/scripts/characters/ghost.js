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

        this.directionTimerDefault = this.#random(1, 5);
        this.directionTimer = this.directionTimerDefault;
        this.scaredAboutToExpireTimerDefault = 10;
        this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;
    }

    draw(ctx, pause, pacman) {
        if (!pause) {
            this.#move();
            this.#changeDirection();
        }
        this.#setImage(ctx, pacman);
        ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize)
    }

    collideWith(pacman) {
        const size = this.tileSize / 2;
        if (this.x < pacman.x + size && this.x + size > pacman.x && this.y < pacman.y + size && this.y + size > pacman.y) {
            return true;
        }
        else {
            return false;
        }
    }

    #setImage(ctx, pacman) {
        if(pacman.powerDotActive) {
            this.#setImageWhenPowerDotIsActive(pacman)
        }
        else {
            this.image = this.normalGhost;
        }
        ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize)
    }

    #setImageWhenPowerDotIsActive(pacman) {
        if (pacman.powerDotAboutToExpire) {
            this.scaredAboutToExpireTimer--;
            if(this.scaredAboutToExpireTimer === 0) {
                this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;
                if (this.image === this.scaredGhost) {
                    this.image = this.scaredGhost2;
                }
                else {
                    this.image = this.scaredGhost;
                }
            }
        }
        else {
            this.image = this.scaredGhost;
        }
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

    #changeDirection() {
        this.directionTimer--;
        let newMoveDirection = null;
        if (this.directionTimer == 0) {
            this.directionTimer = this.directionTimerDefault;
            newMoveDirection = Math.floor(Math.random() * Object.keys(MovingDirection).length);
        }

        if (newMoveDirection != null && this.movingDirection != newMoveDirection) {
            if (Number.isInteger(this.x / this.tileSize) && Number.isInteger(this.y / this.tileSize)) {
                if (!this.tileMap.didCollideWithEnvironment(this.x, this.y, newMoveDirection)) {
                    this.movingDirection = newMoveDirection;
                }
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