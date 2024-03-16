export default class Enemy {
  constructor(game, positionX, positionY) {
    this.game = game;
    this.width;
    this.height;
    this.x = 0;
    this.y = 0;
    this.positionX = positionX;
    this.positionY = positionY;
    this.markedForDeletion = false;
    this.resize();
    this.collisionDetected = false;
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.game.enemySize,
      this.frameY * this.game.enemySize,
      this.game.enemySize,
      this.game.enemySize,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  update(x, y, deltaTime) {
    this.x = x + this.positionX;
    this.y = y + this.positionY;
    // check collision enemies - projectiles
    this.game.projectilesPool.forEach((projectile) => {
      if (
        !projectile.free &&
        this.game.checkCollision(this, projectile) &&
        this.lives > 0
      ) {
        this.collisionDetected = true;
        this.hit(1);
        projectile.reset();
      } else this.collisionDetected = false; // state design pattern
    });
    if (this.lives < 1) {
      if (this.game.spriteUpdate) this.frameX++;
      if (this.frameX > this.maxFrame) {
        this.markedForDeletion = true;
        if (!this.game.gameOver) this.game.score += this.maxLives;
      }
    }
    // check collision enemies - player
    if (this.game.checkCollision(this, this.game.player) && this.lives > 0) {
      this.lives = 0;
      this.game.player.lives--;
    }
    // lose condition
    if (this.y + this.height > this.game.height || this.game.player.lives < 1) {
      this.game.gameOver = true;
    }
  }
  hit(damage) {
    this.lives -= damage;
  }
  resize() {
    this.width = this.game.enemySize * this.game.ratio;
    this.height = this.game.enemySize * this.game.ratio;
  }
}
