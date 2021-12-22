export default class Ghost {

    constructor(x, y, tileSize, velocity, tileMap) {
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
        this.velocity = velocity;
        this.tileMap = tileMap;

        this.#loadImages();
    }

    draw (ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize)
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