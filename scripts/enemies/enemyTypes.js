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

export class Phantom extends Enemy {
  constructor(game, positionX, positionY) {
    super(game, positionX, positionY);
    this.image = document.getElementById("phantom");
    this.frameX = 0;
    this.maxFrame = 12;
    this.frameY = Math.floor(Math.random() * 4);
    this.lives = 5;
    this.maxLives = this.lives;
    this.maxFlyingFrame;
    this.maxPhasingFrame;
    this.states = [
      new FlyingState(this),
      new PhasingState(this),
      new ExplosionState(this),
    ];
    this.currentState = this.states[0];
    this.currentState.startState();

    this.switchTimer = 0;
    this.switchInterval = Math.random() * 2000 + 1000;
  }
  update(x, y, deltaTime) {
    super.update(x, y, deltaTime);
    this.currentState.updateState(deltaTime);
  }
  setState(state) {
    this.currentState = this.states[state];
    this.currentState.startState();
  }
  hit(damage) {
    this.lives -= damage;
  }
}

class FlyingState {
  constructor(phantom) {
    this.phantom = phantom;
  }
  startState() {
    this.phantom.frameX = 0;
    this.phantom.maxFlyingFrame = 2;
  }
  updateState(deltaTime) {
    // const data = Math.floor(this.game.data.getData()) * 0.01; // For switching enemies
    if (this.phantom.game.spriteUpdate) {
      if (this.phantom.frameX < this.phantom.maxFlyingFrame)
        this.phantom.frameX++;
      else this.phantom.frameX = 0;
    }
    if (this.phantom.lives < 1) this.phantom.setState(2);
    if (this.phantom.switchTimer < this.phantom.switchInterval) {
      this.phantom.switchTimer += deltaTime;
    } else {
      this.phantom.switchTimer = 0;
      this.phantom.setState(1);
    }
  }
}
class PhasingState {
  constructor(phantom) {
    this.phantom = phantom;
    this.speedAttack = false;
  }
  startState() {
    this.phantom.frameX = 3;
    this.phantom.maxPhasingFrame = 5;
  }
  updateState(deltaTime) {
    // Frames handled
    if (this.phantom.game.spriteUpdate) {
      if (this.phantom.frameX < this.phantom.maxPhasingFrame)
        this.phantom.frameX++;
      else this.phantom.frameX = 3;
    }
    // Switch functionality
    if (this.phantom.switchTimer < this.phantom.switchInterval) {
      this.phantom.switchTimer += deltaTime;
    } else {
      this.phantom.switchTimer = 0;
      this.phantom.setState(0);
    }
  }
}
class ExplosionState {
  constructor(phantom) {
    this.phantom = phantom;
  }
  startState() {
    this.phantom.frameX = 6;
  }
  updateState() {
    if (this.phantom.game.spriteUpdate) this.phantom.frameX++;
    if (this.phantom.frameX > this.phantom.maxFrame) {
      this.phantom.markedForDeletion = true;
      if (!this.phantom.game.gameOver)
        this.phantom.game.score += this.phantom.maxLives;
    }
  }
}
