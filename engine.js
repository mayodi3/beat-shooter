import Game from "./scripts/game.js";

let gamePaused = false;
window.addEventListener("load", function () {
  // Page 1
  const play = document.getElementById("play");
  play.addEventListener("click", () => {
    play.style.display = "none";
    document.getElementById("largeContainer").style.display = "block";
  });
  // Level buttons setup - PAGE 3
  const level1Button = document.getElementById("level1Button");
  const level2Button = document.getElementById("level2Button");
  const level3Button = document.getElementById("level3Button");
  const level4Button = document.getElementById("level4Button");
  const level5Button = document.getElementById("level5Button");
  const level6Button = document.getElementById("level6Button");
  const level7Button = document.getElementById("level7Button");
  // Level buttons event listeners
  level1Button.addEventListener("click", () => startGame(1));
  level2Button.addEventListener("click", () => startGame(2));
  level3Button.addEventListener("click", () => startGame(3));
  level4Button.addEventListener("click", () => startGame(4));
  level5Button.addEventListener("click", () => startGame(5));
  level6Button.addEventListener("click", () => startGame(6));
  level7Button.addEventListener("click", () => startGame(7));

  function startGame(level) {
    levelButtons.style.display = "none";
    canvas.style.display = "block";
    controls.style.display = "block";
    audio.style.display = "block";
    game.level = level;
    game.restart();
    animate(0);
    window.addEventListener("keydown", (e) => {
      if (e.key === "p") {
        gamePaused = !gamePaused;
        if (!gamePaused) requestAnimationFrame(animate);
      }
    });
  }

  const levelButtons = document.querySelector(".level-buttons");

  // Canvas setup and drawings - PAGE 4
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  resizeCanvas();
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";
  ctx.font = "30px Impact";

  const leftButton = this.document.getElementById("leftButton");
  const rightButton = this.document.getElementById("rightButton");

  const controls = document.querySelector(".controls");
  const audio = document.getElementById("audio");

  // Canvas resizing
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Level button event listener - PAGE 2
  const levelButton = document.getElementById("levelButton");
  levelButton.addEventListener("click", () => {
    levelButtons.style.display = "grid";
    document.getElementById("largeContainer").style.display = "none";
    document.getElementById("gameLogo").style.display = "none";
  });

  const game = new Game(ctx, canvas);

  leftButton.width *= game.ratio;
  rightButton.width *= game.ratio;

  window.addEventListener("resize", resizeCanvas);
  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(ctx, deltaTime);
    !gamePaused && requestAnimationFrame(animate);
  }
});