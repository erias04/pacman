import Pacman from '../../characters/Pacman.js'
import Ghost from '../../characters/Ghost.js'
import MovingDirection from '../game/MovingDirection.js'

export default class TileMap{
    constructor(tileSize) {
        this.tileSize = tileSize;

        this.yellowDot = new Image();
        this.yellowDot.src = '/app/style/graphics/yellowDot.png';

        this.pinkDot = new Image();
        this.pinkDot.src = '/app/style/graphics/pinkDot.png';

        this.wall = new Image();
        this.wall.src = '/app/style/graphics/wall.png';

        this.powerDot = this.pinkDot;
        this.powerDotAnimationTimerDefault = 30;
        this.powerDotAnimationTimer = this.powerDotAnimationTimerDefault;
    }

    /*  1 = Wall
        0 = Dot
        4 = PacMan
        5 = empty
        6 = ghost
        7 = PowerDot
    */
    map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 7, 6, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 6, 0, 0, 0, 0, 0, 0, 7, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]

    draw(ctx) {
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                let tile = this.map[row][column];
                // If commanded out, the backgound will not be recreated (awseome multiple pacman view (Hacker mode))
                if (tile === 1) {
                    this.#drawWall(ctx, column, row, this.tileSize);
                }
                else if (tile === 0) {
                    this.#drawDot(ctx, column, row, this.tileSize)
                }
                else if (tile === 7) {
                    this.#drawPowerDot(ctx, column, row, this.tileSize);
                }
                else {
                    this.#drawBlank(ctx, column, row, this.tileSize)
                }

                /* // Visualisation of the images (border)
                ctx.strokeStyle = "yellow";
                ctx.strokeRect(column * this.tileSize, row * this.tileSize, this.tileSize, this.tileSize);
                */
            }
        }
    }

    #drawWall(ctx, column, row, size) {
        ctx.drawImage(this.wall, column * this.tileSize, row * this.tileSize, size, size)
    }

    #drawBlank(ctx, column, row, size) {
        // Set different color when eating a dot the background will be this color
        ctx.fillStyle = 'black';
        ctx.fillRect(column * this.tileSize, row * this.tileSize, size, size)
    }

    #drawDot(ctx, column, row, size) {
        ctx.drawImage(this.yellowDot, column * this.tileSize, row * this.tileSize, size, size)
    }

    #drawPowerDot(ctx, column, row, size) {
        this.powerDotAnimationTimer--;
        if (this.powerDotAnimationTimer === 0) {
            this.powerDotAnimationTimer = this.powerDotAnimationTimerDefault;
            if (this.powerDot == this.pinkDot) {
                this.powerDot = this.yellowDot;
            }
            else {
                this.powerDot = this.pinkDot;
            }
        }
        ctx.drawImage(this.powerDot, column * size, row * size, size, size);
    }

    getPacman(velocity) {
        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                let tile = this.map[row][column];
                if (tile === 4) {
                    // Replace Pacman start with a yellowDot
                    this.map[row][column] = 0;
                    return new Pacman(column * this.tileSize, row * this.tileSize, this.tileSize, velocity, this);
                }
            }
        }
    }

    getGhosts(velocity) {
        const ghosts = [];

        for (let row = 0; row < this.map.length; row++) {
            for (let column = 0; column < this.map[row].length; column++) {
                const tile = this.map[row][column];
                if (tile == 6) {
                    this.map[row][column] = 0;
                    ghosts.push(new Ghost(column * this.tileSize, row * this.tileSize, this.tileSize, velocity, this))
                }
            }
        }
        return ghosts;
    }
    

    setCanvasSize(canvas) {
        canvas.width = this.map[0].length * this.tileSize;
        canvas.height = this.map.length * this.tileSize;
    }

    didCollideWithEnvironment(x, y, direction) {
        if(direction == null) {
            return;
        }

        if (Number.isInteger(x / this.tileSize) && Number.isInteger(y / this.tileSize)) {
            let column = 0;
            let row = 0;
            let nextColumn = 0;
            let nextRow = 0;

            switch(direction) {
                case MovingDirection.right:
                    nextColumn = x + this.tileSize;
                    column = nextColumn / this.tileSize;
                    row = y / this.tileSize;
                    break;

                case MovingDirection.left:
                    nextColumn = x - this.tileSize;
                    column = nextColumn / this.tileSize;
                    row = y / this.tileSize;
                    break;

                case MovingDirection.up:
                    nextRow = y - this.tileSize;
                    row = nextRow / this.tileSize;
                    column = x / this.tileSize;
                    break;

                case MovingDirection.down:
                    nextRow = y + this.tileSize;
                    row = nextRow / this.tileSize;
                    column = x / this.tileSize;
                    break;
            }
            const tile = this.map[row][column];
            if (tile === 1) {
                return true;
            }
        }
        return false
    }

    eatDot(x, y) {
        const row = y / this.tileSize;
        const column = x / this.tileSize;
        if (Number.isInteger(row) && Number.isInteger(column)) {
            if (this.map[row][column] === 0) {
                this.map[row][column] = 5;
                return true;
            }
        }
        return false;
    }
}
