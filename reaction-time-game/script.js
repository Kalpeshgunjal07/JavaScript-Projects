const box = document.getElementById("box");
const startBtn = document.getElementById("start");
const result = document.getElementById("result");

let startTime = 0;
let timeoutId = null;
let waitingForClick = false;

// Start game
function startGame() {
  result.textContent = "Wait for green...";
  box.style.background = "red";
  box.textContent = "WAIT...";
  startBtn.disabled = true;
  waitingForClick = false;

  const randomDelay = Math.floor(Math.random() * 3000) + 2000;

  timeoutId = setTimeout(() => {
    box.style.background = "green";
    box.textContent = "CLICK!";
    startTime = Date.now();
    waitingForClick = true;
  }, randomDelay);
}

// Box click
function boxClick() {
  if (!waitingForClick) {
    result.textContent = "Too early! ❌";
    clearTimeout(timeoutId);
    resetGame();
    return;
  }

  const reactionTime = Date.now() - startTime;
  result.textContent = `Your reaction time: ${reactionTime} ms`;
  resetGame();
}

// Reset state
function resetGame() {
  box.style.background = "#ccc";
  box.textContent = "Click Start";
  startBtn.disabled = false;
  waitingForClick = false;
}

// Events
startBtn.addEventListener("click", startGame);
box.addEventListener("click", boxClick);
