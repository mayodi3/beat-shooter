export default class Explosion {
  constructor(game, x, y) {
    this.game = game;
    this.image = document.getElementById("explosions");
    this.x = x;
    this.y = y;
    this.spriteWidth = 89.476;
    this.spriteHeight = 90;
    this.frameX = 0;
    this.frameY = 1;
    this.maxFrames = 20;
    this.markedForDeletion = false;
    this.width;
    this.height;
    this.resize();
  }
  update() {
    if (!this.markedForDeletion)
      if (this.frameX < this.maxFrames) this.frameX++;
    this.markedForDeletion = true;
  }
  draw() {
    if (!this.markedForDeletion) {
      this.game.context.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }
  resize() {
    if (!this.markedForDeletion) {
      this.width = this.spriteWidth * this.game.ratio;
      this.height = this.spriteHeight * this.game.ratio;
    }
  }
}
