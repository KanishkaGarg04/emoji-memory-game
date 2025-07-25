const emojis = ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼'];
let cards = [...emojis, ...emojis];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer = 0;
let interval;

const gameBoard = document.getElementById('game-board');
const moveCount = document.getElementById('moveCount');
const timerDisplay = document.getElementById('timer');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function startTimer() {
  interval = setInterval(() => {
    timer++;
    timerDisplay.textContent = timer;
  }, 1000);
}

function createBoard() {
  gameBoard.innerHTML = "";
  shuffled = shuffle(cards);
  shuffled.forEach(emoji => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.textContent = emoji;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (flippedCards.length === 2 || this.classList.contains('flipped')) return;

  if (moves === 0 && timer === 0) startTimer();

  this.classList.add('flipped');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    moves++;
    moveCount.textContent = moves;
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.emoji === card2.dataset.emoji) {
    matchedPairs++;
    flippedCards = [];
    if (matchedPairs === emojis.length) {
      endGame();
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 800);
  }
}

function endGame() {
  clearInterval(interval);
  message.textContent = `🎉 Congratulations! You completed the game in ${moves} moves and ${timer} seconds!`;
  message.classList.remove('hidden');
  restartBtn.classList.remove('hidden');
}

function restartGame() {
  flippedCards = [];
  matchedPairs = 0;
  moves = 0;
  timer = 0;
  moveCount.textContent = 0;
  timerDisplay.textContent = 0;
  message.classList.add('hidden');
  restartBtn.classList.add('hidden');
  clearInterval(interval);
  createBoard();
}

restartBtn.addEventListener('click', restartGame);

createBoard();