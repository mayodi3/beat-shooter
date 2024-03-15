export default class UI {
  constructor(game) {
    this.game = game;
    this.lostplay = false;
    this.font;
    this.lifeWidth;
    this.lifeHeight;
    this.resize();
  }
  drawStatusText(context) {
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "black";
    context.fillStyle = "white";
    context.font = this.font + "px Bangers";
    context.fillText("Score: " + this.game.score, 20, 45);
    context.fillText(
      "Wave: " + this.game.waveCount,
      this.game.width * 0.45,
      45
    );
    for (let i = 0; i < this.game.player.maxLives; i++) {
      context.strokeRect(
        this.game.width * 0.42 + this.lifeWidth * 2 * i,
        70,
        this.lifeWidth,
        this.lifeHeight
      );
    }
    for (let i = 0; i < this.game.player.lives; i++) {
      context.fillRect(
        this.game.width * 0.42 + this.lifeWidth * 2 * i,
        70,
        this.lifeWidth,
        this.lifeHeight
      );
    }
    if (this.game.gameOver) {
      context.textAlign = "center";
      context.font = 80 + "px Bangers";
      context.fillText(
        "GAME OVER!",
        this.game.width * 0.5,
        this.game.height * 0.5,
        this.game.width
      );
      context.font = 40 + "px Bangers";
      context.fillText(
        "Press R to restart!",
        this.game.width * 0.5,
        this.game.height * 0.5 + 30,
        this.game.width
      );
    }
    context.restore();
  }
  resize() {
    this.font = 50 * this.game.ratio;
    this.game.context.font = 20 + "px Bangers";
    this.game.context.fillStyle = "white";
    this.lifeWidth = 10 * this.game.ratio;
    this.lifeHeight = 15 * this.game.ratio;
  }
}
