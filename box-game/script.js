const boxes = document.querySelectorAll(".box");
const startBtn = document.getElementById("startBtn");
const statusText = document.getElementById("status");

let activeIndex = -1;
let score = 0;
let rounds = 0;
let maxRounds = 10;
let gameActive = false;

// Start game
function startGame() {
  score = 0;
  rounds = 0;
  gameActive = true;
  startBtn.disabled = true;
  statusText.textContent = "Game Started!";
  nextRound();
}

// Activate random box
function nextRound() {
  if (rounds === maxRounds) {
    endGame();
    return;
  }

  clearActive();
  activeIndex = Math.floor(Math.random() * boxes.length);
  boxes[activeIndex].classList.add("active");
  rounds++;
}

// Handle box click
function handleBoxClick(index) {
  if (!gameActive) return;

  if (index === activeIndex) {
    score++;
    statusText.textContent = `Score: ${score}`;
    nextRound();
  } else {
    statusText.textContent = "Wrong box ❌";
  }
}

// Clear active box
function clearActive() {
  boxes.forEach(box => box.classList.remove("active"));
}

// End game
function endGame() {
  gameActive = false;
  clearActive();
  startBtn.disabled = false;
  statusText.textContent = `Game Over! Final Score: ${score}`;
}

// Events
boxes.forEach((box, index) => {
  box.addEventListener("click", () => handleBoxClick(index));
});

startBtn.addEventListener("click", startGame);
