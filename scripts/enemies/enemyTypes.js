import Enemy from "./enemy.js";

export class Beetle extends Enemy {
  constructor(game, positionX, positionY) {
    super(game, positionX, positionY);
    this.image = document.getElementById("beetle");
    this.frameX = 0;
    this.maxFrame = 2;
    this.frameY = Math.floor(Math.random() * 4);
    this.lives = 1;
    this.maxLives = this.lives;
  }
}

export class RhinoCrack extends Enemy {
  constructor(game, positionX, positionY) {
    super(game, positionX, positionY);
    this.image = document.getElementById("rhinocrack");
    this.frameX = 0;
    this.maxFrame = 5;
    this.frameY = Math.floor(Math.random() * 4);
    this.lives = 4;
    this.maxLives = this.lives;
  }
  hit(damage) {
    this.lives -= damage;
    this.frameX = this.maxLives - Math.floor(this.lives);
  }
}

export class LobsterBurst extends Enemy {
  constructor(game, positionX, positionY) {
    super(game, positionX, positionY);
    this.image = document.getElementById("lobsterburst");
    this.frameX = 0;
    this.maxFrame = 14;
    this.frameY = Math.floor(Math.random() * 4);
    this.lives = 4;
    this.maxLives = this.lives;
  }
  hit(damage) {
    this.lives -= damage;
    this.frameX = this.maxLives - Math.floor(this.lives);
  }
}

export class Phantom extends Enemy {
  constructor(game, positionX, positionY) {
    super(game, positionX, positionY);
    this.image = document.getElementById("phantom");
    this.frameX = 0;
    this.maxFrame = 12;
    this.frameY = Math.floor(Math.random() * 4);
    this.lives = 5;
    this.maxLives = this.lives;
  }
  hit(damage) {
    this.lives -= damage;
    this.frameX = this.maxLives - Math.floor(this.lives);
  }
}

export class Locust extends Enemy {
  constructor(game, positionX, positionY) {
    super(game, positionX, positionY);
    this.image = document.getElementById("locust");
    this.frameX = 0;
    this.maxFrame = 15;
    this.frameY = Math.floor(Math.random() * 4);
    this.lives = 5;
    this.maxLives = this.lives;
    this.width = 78.53;
  }
  hit(damage) {
    this.lives -= damage;
    this.frameX = this.maxLives - Math.floor(this.lives);
  }
}

export class SquidWard extends Enemy {
  constructor(game, positionX, positionY) {
    super(game, positionX, positionY);
    this.image = document.getElementById("squidward");
    this.frameX = 0;
    this.maxFrame = 17;
    this.frameY = Math.floor(Math.random() * 4);
    this.lives = 3;
    this.maxLives = this.lives;
  }
  hit(damage) {
    this.lives -= damage;
    this.frameX = this.maxLives - Math.floor(this.lives);
  }
}

export class EagleShoot extends Enemy {
  constructor(game, positionX, positionY) {
    super(game, positionX, positionY);
    this.image = document.getElementById("eagleshoot");
    this.frameX = 0;
    this.maxFrame = 8;
    this.frameY = Math.floor(Math.random() * 4);
    this.lives = 4;
    this.maxLives = this.lives;
    this.shots = 0;
  }
  hit(damage) {
    if (this.shots < 4) this.shoot();
    this.lives -= damage;
    this.frameX = this.maxLives - Math.floor(this.lives);
    this.y += 3;
  }
  shoot() {
    const projectile = this.game.getEnemyProjectile();
    if (projectile) {
      projectile.start(this.x + this.width * 0.5, this.y + this.height * 0.5);
      this.shots++;
    }
  }
}
