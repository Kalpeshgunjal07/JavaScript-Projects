const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const display = document.getElementById("display");

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

let totalSeconds = 0;
let timer = null;

// Update display
function updateDisplay() {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  display.textContent =
    String(mins).padStart(2, "0") + ":" + String(secs).padStart(2, "0");
}

// Start countdown
function startTimer() {
  const mins = parseInt(minutesInput.value) || 0;
  const secs = parseInt(secondsInput.value) || 0;

  if (totalSeconds === 0) {
    totalSeconds = mins * 60 + secs;
  }

  if (totalSeconds <= 0) return;

  timer = setInterval(() => {
    totalSeconds--;
    updateDisplay();

    if (totalSeconds === 0) {
      clearInterval(timer);
      timer = null;
      startBtn.disabled = false;
      pauseBtn.disabled = true;
      resetBtn.disabled = false;
    }
  }, 1000);

  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = true;
}

// Pause countdown
function pauseTimer() {
  clearInterval(timer);
  timer = null;

  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = false;
}

// Reset countdown
function resetTimer() {
  clearInterval(timer);
  timer = null;
  totalSeconds = 0;

  display.textContent = "00:00";
  minutesInput.value = "";
  secondsInput.value = "";

  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
}

// Events
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
