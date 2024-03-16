import Game from "./scripts/game.js";

window.addEventListener("load", function () {
  // Canvas setup
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  resizeCanvas();
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  ctx.fillStyle = "white";
  ctx.strokeStyle = "white";
  ctx.font = "30px Impact";
  // Other declarations
  const game = new Game(ctx, canvas);
  const levelButtons = document.querySelector(".level-buttons");
  let gamePaused = false;
  const leftButton = this.document.getElementById("leftButton");
  const rightButton = this.document.getElementById("rightButton");
  leftButton.width *= game.ratio;
  rightButton.width *= game.ratio;
  const controls = document.querySelector(".controls");

  // const audio = document.getElementById("audio");

  function handlePage1() {
    const firstPage = document.getElementById("firstPage");
    play.addEventListener("click", () => {
      firstPage.style.display = "none";
      document.getElementById("largeContainer").style.display = "block";
    });
  }
  function handlePage2() {
    const levelButton = document.getElementById("levelButton");
    levelButton.addEventListener("click", () => {
      levelButtons.style.display = "grid";
      document.getElementById("largeContainer").style.display = "none";
      document.getElementById("gameLogo").style.display = "none";
    });
  }
  function handlePage3() {
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

    const counter = document.getElementById("counter");
    const audioCounter = document.getElementById("audioCounter");
    const menuMusic = document.getElementById("menuMusic");
    function startGame(level) {
      levelButtons.style.display = "none";
      canvas.style.display = "none";
      controls.style.display = "none";
      counter.style.display = "block";
      menuMusic.pause();
      audioCounter.play();
      setTimeout(() => {
        // PAGE 4
        counter.style.display = "none";
        canvas.style.display = "block";
        controls.style.display = "block";
        audioCounter.pause();
        game.level = level;
        game.restart();
        animate(0);
      }, 5000);
      window.addEventListener("keydown", (e) => {
        if (e.key === "p") {
          gamePaused = !gamePaused;
          if (!gamePaused) requestAnimationFrame(animate);
        }
      });
    }
  }

  // PAGE 1
  handlePage1();
  // PAGE 2
  handlePage2();
  // PAGE 3
  handlePage3();

  // Animation Loop
  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(ctx, deltaTime);
    !gamePaused && requestAnimationFrame(animate);
  }
});
