const instructions = document.getElementById("instructions");
const stats = document.getElementById("statistics");
const confirm = document.getElementById("confirm-msg");

//Functions for instructions visibility

function exitInstructions() {
  instructions.classList.remove("visible");
  instructions.classList.add("hidden");
}

function showInstrustions() {
  if (stats.classList.contains("visible")) {
    stats.classList.remove("visible");
    stats.classList.add("hidden");
  }
  instructions.classList.remove("hidden");
  instructions.classList.add("visible");
}

//Function for Next Wordle countdown (on stats)
const time = document.getElementById("coundown");

function getTime() {
  setInterval(getTime, 1000);
  let now = new Date();
  let hours = 23 - now.getHours();
  if (hours < 10) hours = "0" + hours;
  let mins = 59 - now.getMinutes();
  if (mins < 10) mins = "0" + mins;
  let secs = 59 - now.getSeconds();
  if (secs < 10) secs = "0" + secs;

  time.innerHTML = `${hours}:${mins}:${secs}`;
}

//Function for statistics visability

function exitStatistics() {
  stats.classList.remove("visible");
  stats.classList.add("hidden");
}

function showStats() {
  if (instructions.classList.contains("visible")) {
    instructions.classList.remove("visible");
    instructions.classList.add("hidden");
  }
  stats.classList.remove("hidden");
  stats.classList.add("visible");
  getTime();
}

//Function to share stats
let gameNumber = 223;
let completedIn = 3;
let solution = `⬛⬛🟨⬛⬛
⬛🟨🟨🟨⬛
🟩🟩🟩🟩🟩`;

function shareStats() {
  const personalStats = `Wordle ${gameNumber} ${completedIn}/6 ${solution}`;
  navigator.clipboard.writeText(personalStats).then(function () {
    confirm.classList.add("visible");
    setTimeout(function () {
      confirm.classList.remove("visible");
    }, 1500);
  });
}
