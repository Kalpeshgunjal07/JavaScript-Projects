const boxes = document.querySelectorAll(".box");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const statusText = document.getElementById("status");
const resultsList = document.getElementById("results");

let activeIndex = -1;
let startTime = 0;
let gameActive = false;
let timeoutId = null;

/* -------- START GAME -------- */
function startGame() {
  clearActiveBox();
  statusText.textContent = "Wait for green box...";
  startBtn.disabled = true;
  resetBtn.disabled = false;
  gameActive = false;

  const randomDelay = Math.floor(Math.random() * 3000) + 2000;

  timeoutId = setTimeout(() => {
    activeIndex = Math.floor(Math.random() * boxes.length);
    boxes[activeIndex].classList.add("active");
    startTime = Date.now();
    gameActive = true;
    statusText.textContent = "CLICK NOW!";
  }, randomDelay);
}

/* -------- HANDLE BOX CLICK -------- */
function handleBoxClick(index) {
  if (!gameActive) {
    statusText.textContent = "Too early ❌";
    clearTimeout(timeoutId);
    startBtn.disabled = false;
    return;
  }

  if (index === activeIndex) {
    const reactionTime = Date.now() - startTime;
    addResult(reactionTime);
    statusText.textContent = `Reaction Time: ${reactionTime} ms`;
    clearActiveBox();
    gameActive = false;
    startBtn.disabled = false;
  }
}

/* -------- ADD RESULT -------- */
function addResult(time) {
  const li = document.createElement("li");
  li.textContent = `${time} ms`;
  resultsList.appendChild(li);
}

/* -------- CLEAR ACTIVE BOX -------- */
function clearActiveBox() {
  boxes.forEach(box => box.classList.remove("active"));
}

/* -------- RESET GAME -------- */
function resetGame() {
  clearActiveBox();
  resultsList.innerHTML = "";
  statusText.textContent = "Click Start to begin";
  startBtn.disabled = false;
  resetBtn.disabled = true;
  gameActive = false;
}

/* -------- EVENTS -------- */
boxes.forEach((box, index) => {
  box.addEventListener("click", () => handleBoxClick(index));
});

startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);
