const gameBoard = document.getElementById("game-board");
const restartBtn = document.getElementById("restartBtn");

// Emoji set
const cardSymbols = ["🍎","🍋","🍇","🍊","🍉","🍒","🍓","🥝"];
let cards = [];
let firstCard, secondCard;
let lockBoard = false;

// Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // pick random index
    [array[i], array[j]] = [array[j], array[i]];   // swap
  }
  return array;
  
}
// Create cards
function createBoard() {
  gameBoard.innerHTML = "";
  const gameCards = shuffle([...cardSymbols, ...cardSymbols]);

  gameCards.forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card", "bg-white", "rounded-lg", "shadow", "cursor-pointer", "aspect-square", "flex", "items-center", "justify-center", "text-3xl", "font-bold", "relative");

    card.dataset.symbol = symbol;

    // Inner structure
    card.innerHTML = `
      <div class="card-inner w-full h-full relative">
        <div class="card-back absolute inset-0 flex items-center justify-center bg-indigo-500 text-white rounded-lg">❓</div>
        <div class="card-front absolute inset-0 flex items-center justify-center bg-yellow-300 rounded-lg">${symbol}</div>
      </div>
    `;

    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

// Flip logic
function flipCard() {
  if (lockBoard || this === firstCard) return;
  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

// Match check
function checkMatch() {
  let isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

  isMatch ? disableCards() : unflipCards();
}

// Disable matched
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

// Unflip if not match
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

// Reset state
function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Restart
restartBtn.addEventListener("click", () => {
  resetBoard();
  createBoard();
});

// Init
createBoard();