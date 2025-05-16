// === TILE GAME LOGIC (game.js) ===
let tiles = [];

function initGame() {
  steps = 0;
  stepCounter.textContent = steps;
  finalQuestion.style.display = 'none';
  startTime = Date.now();
  if (timerInterval) clearInterval(timerInterval);
  startTimer();
  createTiles();
  renderTiles();
}

function createTiles() {
    tiles = [];
  
    // создаём 8 обычных тайлов (без пустой)
    for (let y = 0; y < gridRows; y++) {
      for (let x = 0; x < gridCols; x++) {
        const isLast = x === gridCols - 1 && y === gridRows - 1;
        if (!isLast) {
          tiles.push(createTile(x, y));
        }
      }
    }
  
    // перемешиваем только обычные плитки
    const positions = [];
    for (let y = 0; y < gridRows; y++) {
      for (let x = 0; x < gridCols; x++) {
        const isLast = x === gridCols - 1 && y === gridRows - 1;
        if (!isLast) positions.push({ x, y });
      }
    }
    const shuffled = [...positions].sort(() => Math.random() - 0.5);
  
    tiles.forEach((tile, i) => {
      tile.currentX = shuffled[i].x;
      tile.currentY = shuffled[i].y;
    });
  
    // добавляем пустой тайл в конец
    tiles.push(createEmptyTile(gridCols - 1, gridRows - 1));
  }
  

function createTile(correctX, correctY) {
  const div = document.createElement('div');
  div.className = 'tile';
  const xPercent = (correctX / (gridCols - 1)) * 100;
  const yPercent = (correctY / (gridRows - 1)) * 100;
  div.style.backgroundImage = `url('${currentImage}')`;
  div.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
  div.style.backgroundSize = `${gridCols * 100}% ${gridRows * 100}%`;

  return {
    element: div,
    correctX,
    correctY,
    currentX: correctX,
    currentY: correctY,
    isEmpty: false
  };
}

function createEmptyTile(x, y) {
  const div = document.createElement('div');
  div.className = 'tile empty';
  return {
    element: div,
    correctX: x,
    correctY: y,
    currentX: x,
    currentY: y,
    isEmpty: true
  };
}

function renderTiles() {
  container.innerHTML = '';
  for (let y = 0; y < gridRows; y++) {
    for (let x = 0; x < gridCols; x++) {
      const tile = tiles.find(t => t.currentX === x && t.currentY === y);
      tile.element.onclick = () => onTileClick(tile);
      container.appendChild(tile.element);
    }
  }
}

function onTileClick(tile) {
  if (devMode) {
    const target = tiles.find(t => t.correctX === tile.currentX && t.correctY === tile.currentY);
    if (target && target !== tile) {
      swapTiles(tile, target);
    }
  } else {
    const empty = tiles.find(t => t.isEmpty);
    const dx = Math.abs(tile.currentX - empty.currentX);
    const dy = Math.abs(tile.currentY - empty.currentY);
    if (dx + dy === 1) {
      swapTiles(tile, empty);
    }
  }
  steps++;
  stepCounter.textContent = steps;
  renderTiles();
  checkVictory();
}

function swapTiles(t1, t2) {
  [t1.currentX, t2.currentX] = [t2.currentX, t1.currentX];
  [t1.currentY, t2.currentY] = [t2.currentY, t1.currentY];
}

function checkVictory() {
  const allCorrect = tiles.every(t =>
    t.currentX === t.correctX && t.currentY === t.correctY
  );
  if (allCorrect) {
    clearInterval(timerInterval);
    setTimeout(() => {
      finalQuestion.style.display = 'block';
    }, 500);
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}
