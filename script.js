// === CONFIG ===
const gridCols = 3;
const gridRows = 3;
const devMode = true; // true = режим разработчика

// === STATE ===
let container = document.getElementById('puzzle-container');
let stepCounter = document.getElementById('step-count');
let timerDisplay = document.getElementById('timer');
let finalQuestion = document.getElementById('final-question');
let btnYes = document.getElementById('btn-yes');
let btnNo = document.getElementById('btn-no');
let restartButton = document.getElementById('restart-button');
let secondDenial = document.getElementById('second-denial');
let btnGift = document.getElementById('btn-gift');


const images = ["photo1.jpg", "photo2.jpg", "photo3.jpg", "photo4.jpg"];
let currentImage = null;
let denialCount = 0;
let steps = 0;
let startTime = Date.now();
let timerInterval = null;

// === INIT ===
loadNewImage();

restartButton.addEventListener('click', () => {
  restartGame();
});

btnYes.addEventListener('click', () => {
  finalQuestion.style.display = 'none';
  window.location.href = "wish.html";
});

btnNo.addEventListener('click', () => {
  denialCount++;
  finalQuestion.style.display = 'none';

  if (denialCount >= 2) {
    secondDenial.style.display = 'block';
  } else {
    container.innerHTML = ''; // 👈 очистка пазла
    loadNewImage();
  }
});


btnGift.addEventListener('click', () => {
  window.location.href = "wish.html";
});

function getRandomImage(exclude) {
  const pool = images.filter(img => img !== exclude);
  return pool[Math.floor(Math.random() * pool.length)];
}

function loadNewImage() {
  const newImage = getRandomImage(currentImage);
  currentImage = newImage;

  const img = new Image();
  img.src = newImage;
  img.onload = () => {
    initGame();
  };
}

function restartGame() {
  const img = new Image();
  img.src = currentImage;
  img.onload = () => {
    initGame();
  };
}

// логика игры теперь в отдельном файле game.js
