const textToType = document.getElementById("textToType");
const inputText = document.getElementById("inputText");
const highlightedText = document.getElementById("highlightedText");
const startBtn = document.getElementById("startBtn");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const results = document.getElementById("results");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

const texts = [
  "Le JavaScript est un langage de programmation utilisé pour rendre les pages web interactives.",
  "Apprendre à manipuler le DOM permet de créer des interfaces dynamiques et réactives.",
  "La vitesse et la précision sont essentielles pour devenir un bon développeur."
];

let time = 60;
let timer;
let started = false;
let currentText = "";

startBtn.addEventListener("click", startGame);

function startGame() {
  currentText = texts[Math.floor(Math.random() * texts.length)];
  textToType.textContent = currentText;

  inputText.value = "";
  highlightedText.innerHTML = "";
  inputText.disabled = false;
  inputText.focus();

  time = 60;
  started = true;
  scoreDisplay.textContent = "0";
  results.classList.add("hidden");
  timerDisplay.textContent = time;

  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  time--;
  timerDisplay.textContent = time;
  if (time <= 0) endGame();
}

inputText.addEventListener("input", () => {
  if (!started) return;

  const inputArray = inputText.value.split("");
  const textArray = currentText.split("");
  let highlighted = "";
  let correctChars = 0;

  textArray.forEach((char, index) => {
    const typedChar = inputArray[index];
    if (typedChar == null) {
      highlighted += `<span>${char}</span>`;
    } else if (typedChar === char) {
      highlighted += `<span class="correct">${char}</span>`;
      correctChars++;
    } else {
      highlighted += `<span class="incorrect">${char}</span>`;
    }
  });

  highlightedText.innerHTML = highlighted;

  const wordsTyped = inputText.value.trim().split(/\s+/).filter(Boolean).length;
  scoreDisplay.textContent = wordsTyped;

  // synchronise le scroll
  highlightedText.scrollTop = inputText.scrollTop;
});

function endGame() {
  clearInterval(timer);
  started = false;
  inputText.disabled = true;

  const textArray = currentText.split("");
  const inputArray = inputText.value.split("");
  const correctChars = inputArray.filter(
    (c, i) => c === textArray[i]
  ).length;
  const accuracy = Math.round((correctChars / textArray.length) * 100);
  const wordsTyped = inputText.value.trim().split(/\s+/).filter(Boolean).length;
  const wpm = Math.round(wordsTyped);

  wpmDisplay.textContent = wpm;
  accuracyDisplay.textContent = accuracy;
  results.classList.remove("hidden");
}

