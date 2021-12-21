export default class Pacman {
    constructor(x, y, tileSize, velocity, tileMap) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;
        this.#loadPacmanImages();
    }
    
    draw(ctx) {}

    #loadPacmanImages() {
        const pacmanImage1 = new Image();
        pacmanImage1.src ='/app/style/graphics/pac0.png'

        const pacmanImage2 = new Image();
        pacmanImage2.src ='/app/style/graphics/pac1.png'

        const pacmanImage3 = new Image();
        pacmanImage3.src ='/app/style/graphics/pac2.png'

        const pacmanImage4 = new Image();
        pacmanImage4.src ='/app/style/graphics/pac1.png'
    }
}  