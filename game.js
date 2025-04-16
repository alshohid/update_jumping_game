class UI {
  constructor() {
    this.cloud = document.querySelector(".cloud");
    this.cityInner = document.querySelector(".city-inner");
    this.cityOuter = document.querySelector(".city-outer");
    this.cat = document.querySelector(".cat");
    this.car = document.querySelector(".car");
    this.gameStarter = document.querySelector(".game-starter");
    this.gameAudio = document.querySelector(".game-audio");
    this.catAudio = document.querySelector(".cat-audio");
    this.myAudio = document.querySelector("#my-audio");
    this.points = document.querySelector(".points");
    this.scoreText = document.querySelector("#score h1");
    this.counter = document.querySelector("#counter");
    this.gameOverScreen = document.querySelector(".game-over");
    this.startBtn = document.querySelector("#start-btn");
  }

  toggleCityAnimation() {
    this.cityOuter.classList.toggle("daytoNight");
    this.cityOuter.classList.toggle("rainAnimation");
  }

  updateScore(score) {
    this.scoreText.innerHTML = `Your Score : ${score}`;
    this.points.innerHTML = `Points : ${score}`;
  }

  showGameElements() {
    this.cat.style.visibility = "visible";
    this.car.style.visibility = "visible";
    this.gameStarter.style.visibility = "hidden";
    this.cloud.classList.add("cloudanimation");
    this.cityInner.classList.add("roadAnimation");
    this.cat.classList.add("animationcat");
  }

  stopGameAnimations() {
    this.cloud.classList.remove("cloudanimation");
    this.cityInner.classList.remove("roadAnimation");
    this.cityOuter.classList.remove("rainAnimation");
    this.cat.classList.remove("animationcat");
    this.car.style.visibility = "hidden";
    this.cat.style.visibility = "hidden";
    this.gameOverScreen.style.visibility = "visible";
  }

  changeCatImage() {
    const photos = ["images/dog.gif", "images/cat2.gif", "images/horin.gif"];
    const count = Math.floor(Math.random() * photos.length);
    this.cat.src = photos[count];
  }
}

class Game {
  constructor(ui) {
    this.ui = ui;
    this.score = 0;
    this.cross = true;
    this.music = false;
    this.paused = false;
    this.toggleTime = null;
    this.collisionLoop = null;

    this.init();
  }

  init() {
    // Start button click
    this.ui.startBtn.addEventListener("click", () => {
      this.ui.startBtn.disabled = true;
      this.ui.startBtn.style.visibility = "hidden";
      this.startCountdown();
    });

    // Music toggle (press 'm') and pause (press 's')
    document.addEventListener("keypress", (e) => {
      if (e.key === "m") {
        this.music ? this.ui.gameAudio.pause() : this.ui.gameAudio.play();
        this.music = !this.music;
      }

      if (e.key === "s") {
        this.paused = !this.paused;
      }
    });
  }

  startCountdown() {
    let seconds = parseInt(this.ui.counter.textContent);
    const countdown = setInterval(() => {
      seconds--;
      this.ui.counter.textContent = seconds;
      if (seconds <= 0) {
        clearInterval(countdown);
        this.startGame();
      }
    }, 1000);
  }

  startGame() {
    this.ui.showGameElements();
    this.toggleTime = setInterval(() => this.ui.toggleCityAnimation(), 10000);
    this.setupControls();
    this.startCollisionDetection();
  }

  setupControls() {
    document.addEventListener("keydown", (e) => {
      if (this.paused) return;

      const key = e.keyCode;

      if (key === 38) {
        this.ui.myAudio.play();
        this.ui.car.classList.add("animationCar");
        setTimeout(() => {
          this.ui.car.classList.remove("animationCar");
        }, 900);
      }

      if (key === 39 || key === 37) {
        const offset = key === 39 ? 112 : -112;
        const carLeft = parseInt(getComputedStyle(this.ui.car).left);
        this.ui.car.style.left = carLeft + offset + "px";
      }
    });
  }

  startCollisionDetection() {
    this.collisionLoop = setInterval(() => {
      if (this.paused) return;

      const carX = parseInt(getComputedStyle(this.ui.car).left);
      const carY = parseInt(getComputedStyle(this.ui.car).top);
      const catX = parseInt(getComputedStyle(this.ui.cat).left);
      const catY = parseInt(getComputedStyle(this.ui.cat).top);

      const offsetX = Math.abs(carX - catX);
      const offsetY = Math.abs(carY - catY);

      if (offsetX < 112 && offsetY < 52) {
        this.ui.stopGameAnimations();
        this.ui.gameAudio.pause();
        clearInterval(this.toggleTime);
        clearInterval(this.collisionLoop);
        this.ui.updateScore(this.score);
      } else if (offsetX < 145 && this.cross) {
        setTimeout(() => this.ui.changeCatImage(), 7000);
        this.score++;
        this.ui.updateScore(this.score);
        this.cross = false;
        setTimeout(() => {
          this.cross = true;
        }, 100);
      }
    }, 10);
  }
}

// Start the game when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  new Game(ui);
});
