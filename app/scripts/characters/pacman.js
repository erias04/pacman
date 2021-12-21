import MovingDirection from '../core/game/MovingDirection.js'

export default class Pacman {
    constructor(x, y, tileSize, velocity, tileMap) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;

        this.currentMovingDirection = null;
        this.requestedMovementDirection = null;
        document.addEventListener('keydown', this.#keydown);

        this.#loadPacmanImages();
    }
    
    draw(ctx) {
        this.#move();
        ctx.drawImage(this.pacmanImages[this.pacmanImageIndex], this.x, this.y, this.tileSize, this.tileSize)
    }

    #loadPacmanImages() {
        const pacmanImage1 = new Image();
        pacmanImage1.src ='/app/style/graphics/pac0.png'

        const pacmanImage2 = new Image();
        pacmanImage2.src ='/app/style/graphics/pac1.png'

        const pacmanImage3 = new Image();
        pacmanImage3.src ='/app/style/graphics/pac2.png'

        const pacmanImage4 = new Image();
        pacmanImage4.src ='/app/style/graphics/pac1.png'

        this.pacmanImages = [pacmanImage1, pacmanImage2, pacmanImage3, pacmanImage4]

        this.pacmanImageIndex = 0;
    }

    #keydown = (event) => {
        /*  38 = up
            40 = down
            37 = left
            39 = right
        */ 
        if(event.keyCode == 38) {
            if(this.currentMovingDirection == MovingDirection.down)
                this.currentMovingDirection = MovingDirection.up;
            this.requestedMovementDirection = MovingDirection.up;
        }
        if(event.keyCode == 40) {
            if(this.currentMovingDirection == MovingDirection.up)
                this.currentMovingDirection = MovingDirection.down;
            this.requestedMovementDirection = MovingDirection.down;
        }
        if(event.keyCode == 37) {
            if(this.currentMovingDirection == MovingDirection.right)
                this.currentMovingDirection = MovingDirection.left;
            this.requestedMovementDirection = MovingDirection.left;
        }
        if(event.keyCode == 39) {
            if(this.currentMovingDirection == MovingDirection.left)
                this.currentMovingDirection = MovingDirection.right;
            this.requestedMovementDirection = MovingDirection.right;
        }
    }

    #move() {
        if (this.currentMovingDirection !== this.requestedMovementDirection) {
            if (Number.isInteger(this.x / this.tileSize) && Number.isInteger(this.y / this.tileSize)) {
                this.currentMovingDirection = this.requestedMovementDirection;
            }
        }
        switch(this.currentMovingDirection) {
            case MovingDirection.up:
                this.y -= this.velocity;
                break;
        }
    }
}  