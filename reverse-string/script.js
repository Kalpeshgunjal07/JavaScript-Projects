const input = document.getElementById("input");
const startBtn = document.getElementById("startBtn");
const output = document.getElementById("output");

let intervalId;
let index;

input.addEventListener("input", () => {
  startBtn.disabled = input.value.trim() === "";
});

startBtn.addEventListener("click", () => {
  output.textContent = "";
  const reversed = input.value.split("").reverse().join("");
  index = 0;

  startBtn.disabled = true;

  intervalId = setInterval(() => {
    output.textContent += reversed[index];
    index++;

    if (index === reversed.length) {
      clearInterval(intervalId);
      startBtn.disabled = false;
    }
  }, 500);
});
