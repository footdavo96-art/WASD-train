// Game State
let gameState = {
  mode: null,
  difficulty: null,
  pattern: [],
  currentIndex: 0,
  totalPresses: 0,
  correctPresses: 0,
  startTime: null,
  isPaused: false,
  timerInterval: null
};

// Difficulty Settings
const difficulties = {
  easy: { speed: 1500, minLength: 5, maxLength: 10 },
  medium: { speed: 1000, minLength: 10, maxLength: 15 },
  hard: { speed: 600, minLength: 15, maxLength: 20 },
  expert: { speed: 300, minLength: 20, maxLength: 30 }
};

// Speedcube Patterns (Roux, CFOP-like sequences)
const speedcubePatterns = [
  'WASDASDWASDASD',
  'WDWDWDWDWDWD',
  'ASDASDASDASD',
  'DADADADADADA',
  'WADWADWADWAD',
  'SAWSAWSAW',
  'DWADWADWA',
  'WASDWASDWASD'
];

function selectMode(mode) {
  gameState.mode = mode;
  switchScreen('menu-screen', 'difficulty-screen');
}

function backToMenu() {
  switchScreen('difficulty-screen', 'menu-screen');
}

function startTraining(difficulty) {
  gameState.difficulty = difficulty;
  gameState.totalPresses = 0;
  gameState.correctPresses = 0;
  gameState.currentIndex = 0;
  gameState.isPaused = false;
  gameState.startTime = Date.now();

  generatePattern();
  updateUI();
  switchScreen('difficulty-screen', 'trainer-screen');
  
  // Initialize 3D cube
  setTimeout(() => {
    initCubeOnTrainerLoad();
  }, 100);
  
  startTimer();
  setupKeyListener();
}

function generatePattern() {
  const settings = difficulties[gameState.difficulty];
  const length = Math.random() * (settings.maxLength - settings.minLength) + settings.minLength;

  if (gameState.mode === 'speedcube') {
    const basePattern = speedcubePatterns[Math.floor(Math.random() * speedcubePatterns.length)];
    gameState.pattern = basePattern.repeat(Math.ceil(length / basePattern.length)).substring(0, length).toUpperCase();
  } else {
    // General mode: random WASD
    const keys = ['W', 'A', 'S', 'D'];
    gameState.pattern = '';
    for (let i = 0; i < length; i++) {
      gameState.pattern += keys[Math.floor(Math.random() * keys.length)];
    }
  }

  gameState.currentIndex = 0;
  updatePatternDisplay();
}

function setupKeyListener() {
  document.addEventListener('keydown', handleKeyPress);
}

function handleKeyPress(event) {
  if (gameState.isPaused || !gameState.startTime) return;

  const key = event.key.toUpperCase();
  if (!['W', 'A', 'S', 'D'].includes(key)) return;

  event.preventDefault();

  // Rotate cube based on key press
  if (typeof rotateCubeWASD === 'function') {
    rotateCubeWASD(key);
  }

  gameState.totalPresses++;
  const expectedKey = gameState.pattern[gameState.currentIndex];

  // Visual feedback on key
  const keyElement = document.getElementById(`key-${key}`);
  if (keyElement) {
    keyElement.classList.add('active');
    setTimeout(() => keyElement.classList.remove('active'), 100);
  }

  if (key === expectedKey) {
    gameState.correctPresses++;
    showFeedback('✓ Correct!', 'correct');
    highlightKey(key, 'correct');
    gameState.currentIndex++;

    if (gameState.currentIndex >= gameState.pattern.length) {
      generatePattern();
    }
  } else {
    showFeedback('✗ Wrong!', 'wrong');
    highlightKey(expectedKey, 'wrong');
  }

  updateUI();
}

function highlightKey(key, state) {
  const keyElement = document.getElementById(`key-${key}`);
  if (keyElement) {
    keyElement.classList.add(state);
    setTimeout(() => keyElement.classList.remove(state), 300);
  }
}

function showFeedback(message, type) {
  const feedbackEl = document.getElementById('feedback');
  feedbackEl.textContent = message;
  feedbackEl.className = `feedback ${type}`;
  setTimeout(() => {
    feedbackEl.textContent = '';
    feedbackEl.className = 'feedback';
  }, 1000);
}

function updateUI() {
  // Update stats
  const elapsed = gameState.startTime ? Math.floor((Date.now() - gameState.startTime) / 1000) : 0;
  const accuracy = gameState.totalPresses > 0 ? Math.round((gameState.correctPresses / gameState.totalPresses) * 100) : 0;
  const speed = elapsed > 0 ? Math.round((gameState.totalPresses / elapsed) * 60) : 0;

  document.getElementById('accuracy').innerHTML = `${accuracy}<span class="stat-unit">%</span>`;
  document.getElementById('speed').innerHTML = `${speed}<span class="stat-unit">ppm</span>`;
  document.getElementById('presses').innerHTML = `${gameState.totalPresses}<span class="stat-unit">total</span>`;
  document.getElementById('time').innerHTML = `${elapsed}<span class="stat-unit">s</span>`;

  updatePatternDisplay();
  updateModeTitle();
}

function updatePatternDisplay() {
  document.getElementById('pattern').textContent = gameState.pattern;
  document.getElementById('next-key').textContent = gameState.pattern[gameState.currentIndex] || '✓';
}

function updateModeTitle() {
  const modeText = gameState.mode === 'speedcube' ? '🎲 Speedcube' : '🎯 General';
  const diffText = gameState.difficulty ? gameState.difficulty.charAt(0).toUpperCase() + gameState.difficulty.slice(1) : '';
  document.getElementById('mode-title').textContent = `${modeText} - ${diffText}`;
}

function startTimer() {
  if (gameState.timerInterval) clearInterval(gameState.timerInterval);
  gameState.timerInterval = setInterval(updateUI, 1000);
}

function pauseTraining() {
  gameState.isPaused = !gameState.isPaused;
  const pauseBtn = document.getElementById('pause-btn');
  pauseBtn.textContent = gameState.isPaused ? '▶ Resume' : '⏸ Pause';
}

function resetTraining() {
  document.removeEventListener('keydown', handleKeyPress);
  clearInterval(gameState.timerInterval);
  if (typeof resetCubeRotation === 'function') {
    resetCubeRotation();
  }
  startTraining(gameState.difficulty);
}

function endTraining() {
  document.removeEventListener('keydown', handleKeyPress);
  clearInterval(gameState.timerInterval);
  switchScreen('trainer-screen', 'menu-screen');
  gameState = {
    mode: null,
    difficulty: null,
    pattern: [],
    currentIndex: 0,
    totalPresses: 0,
    correctPresses: 0,
    startTime: null,
    isPaused: false,
    timerInterval: null
  };
}

function switchScreen(from, to) {
  document.getElementById(from).classList.remove('active');
  document.getElementById(to).classList.add('active');
}
