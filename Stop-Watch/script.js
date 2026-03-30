const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

let startTime = 0;
let elapsedTime = 0;
let timer = null;

// Format time
function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;

  return `
    ${String(hours).padStart(2, "0")}:
    ${String(minutes).padStart(2, "0")}:
    ${String(seconds).padStart(2, "0")}
    <span class="ms">.${String(milliseconds).padStart(3, "0")}</span>
  `;
}

// Start stopwatch
function start() {
  if (timer) return;

  startTime = Date.now() - elapsedTime;

  timer = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    display.innerHTML = formatTime(elapsedTime);
  }, 10);

  startBtn.disabled = true;
  stopBtn.disabled = false;
  resetBtn.disabled = true;
}

// Stop stopwatch
function stop() {
  clearInterval(timer);
  timer = null;

  startBtn.disabled = false;
  stopBtn.disabled = true;
  resetBtn.disabled = false;
}

// Reset stopwatch
function reset() {
  elapsedTime = 0;
  display.innerHTML = `00:00:00<span class="ms">.000</span>`;

  startBtn.disabled = false;
  stopBtn.disabled = true;
  resetBtn.disabled = true;
}

// Events
startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);