const instructions = document.getElementById("instructions");
const stats = document.getElementById("statistics");
const confirm = document.getElementById("confirm-msg");
const settings = document.getElementById("settings");
const cells = Array.from(document.querySelectorAll(".cell"));
const played = document.getElementById("played");
const win = document.getElementById("winData");
const sun = document.querySelector(".sun");
const boardkeys = Array.from(document.querySelectorAll(".keyboard button"));
let currentCell = 0;
let rowCount = 1;
let night = true;

let guesses = {
  played: 10,
  lost: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
};

played.innerHTML = guesses.played;
let winPercent = 100;
if (guesses.played === 0) {
  winData.innerHTML = 0;
} else if (guesses.lost === 0) {
  winData.innerHTML = 100;
} else {
  winPercent = (guesses.lost / guesses.played) * 100;
  winData.innerHTML = Math.round(100 - winPercent);
}

//Function for GamePlay
let dailyWord = ["m", "o", "u", "s", "e"];
document.getElementById("word").innerHTML = dailyWord.join("");
let typedWord = [];

function gamePlay(event) {
  let letter;
  event.key ? (letter = event.key) : (letter = event.target.value);
  if (/^[a-z]$/.test(letter) && typedWord.length <= 4) {
    cells[currentCell].innerHTML = letter.toUpperCase();
    typedWord.push(letter);
    currentCell++;
  }
  if (letter === "Enter") wordCheck();
  if (letter === "Backspace") deleteLetter();
}

function wordCheck() {
  if (typedWord.length < 5) {
    let shortWord = document.getElementById("short-word");
    shortWord.classList.add("visible");
    setTimeout(function () {
      shortWord.classList.remove("visible");
    }, 1200);
    return null;
  }
  typedWord.forEach((letter, index) => {
    let box = document.querySelector(`.row${rowCount}-${index + 1}`);
    let letterButton = document.getElementById(letter);
    if (letter === dailyWord[index]) {
      box.style.background = "var(--green)";
      letterButton.style.background = "var(--green)";
    } else if (dailyWord.includes(letter)) {
      box.style.background = "var(--yellow)";
      letterButton.style.background === "var(--green)"
        ? null
        : (letterButton.style.background = "var(--yellow)");
    } else {
      box.style.background = "var(--lightgrey)";
      letterButton.style.opacity = "0.4";
    }
  });

  if (dailyWord.join("") === typedWord.join("")) winner();
  if (currentCell === 30 && dailyWord.join("") !== typedWord.join("")) {
    guesses.played = guesses.played + 1;
    played.innerHTML = guesses.played;
    guesses.lost = guesses.lost + 1;
    winPercent = (guesses.lost / guesses.played) * 100;
    winData.innerHTML = Math.round(100 - winPercent);
    //update steak & max
    //update progress bar
    //save data to local storage
    let message = document.getElementById("lose");
    message.classList.add("visible");
    setTimeout(function () {
      message.classList.remove("visible");
      setTimeout(() => {
        showStats(), 1200;
      });
    }, 1200);
  }
  typedWord = [];
  rowCount++;
}

function winner() {
  guesses.played = guesses.played + 1;
  guesses[rowCount] = guesses[rowCount] + 1;
  played.innerHTML = guesses.played;
  if (guesses.lost === 0) {
    winData.innerHTML = 100;
  } else {
    winPercent = (guesses.lost / guesses.played) * 100;
    winData.innerHTML = Math.round(100 - winPercent);
  }
  //update steak & max
  //use rowCount to update guesses obj
  //update progress bar
  //save played, win, ??, to local storage
  let message = document.getElementById("win");
  message.classList.add("visible");
  setTimeout(function () {
    message.classList.remove("visible");
    setTimeout(() => {
      showStats(), 1200;
    });
  }, 1200);
}

function deleteLetter() {
  if (!cells[currentCell - 1].style.background) {
    currentCell--;
    cells[currentCell].innerHTML = "";
    typedWord.pop();
  }
}

document.addEventListener("keydown", gamePlay);
boardkeys.forEach((key) => key.addEventListener("click", gamePlay));

//Function to calculate & display guess distribution
const progressBars = document.querySelectorAll("progress");
const barsArr = Array.from(progressBars);

/* 

guesses.one === 0
  ? (barsArr[0].value = 1)
  : (barsArr[0].value = (guesses[1] / guesses.played) * 100);
guesses.two === 0
  ? (barsArr[1].value = 1)
  : (barsArr[1].value = (guesses[2] / guesses.played) * 100);
guesses.three === 0
  ? (barsArr[2].value = 1)
  : (barsArr[2].value = (guesses[3] / guesses.played) * 100);
guesses.four === 0
  ? (barsArr[3].value = 1)
  : (barsArr[3].value = (guesses[4] / guesses.played) * 100);
guesses.five === 0
  ? (barsArr[4].value = 1)
  : (barsArr[4].value = (guesses[5] / guesses.played) * 100);
barsArr[5].value = 10;
*/

//Function for "Next Wordle" countdown (on stats pop-up)
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

//Function to calculate game no. (game number increases by one each day)
const startDate = new Date("01/29/2021");
let today = new Date();
const oneDay = 1000 * 60 * 60 * 24; //in milliseconds
const diffInTime = today.getTime() - startDate.getTime();
const gameNumber = Math.round(diffInTime / oneDay);

//Function on button to share stats
let completedIn = 3;
let solution = `\n⬛⬛🟨⬛⬛ \n⬛🟨🟨🟨⬛ \n🟩🟩🟩🟩🟩`;

function shareStats() {
  const personalStats = `Wordle ${gameNumber} ${completedIn}/6 ${solution}`;
  navigator.clipboard.writeText(personalStats).then(function () {
    confirm.classList.add("visible");
    setTimeout(function () {
      confirm.classList.remove("visible");
    }, 1200);
  });
}

//Functions for pop-up visability (instructions, stats and copied to clipboard)
function exitDisplay(props) {
  props.classList.remove("visible");
  props.classList.add("hidden");
}

function showInstructions() {
  if (stats.classList.contains("visible")) {
    stats.classList.remove("visible");
    stats.classList.add("hidden");
  }

  instructions.classList.add("visible");
}

function showStats() {
  if (instructions.classList.contains("visible")) {
    instructions.classList.remove("visible");
    instructions.classList.add("hidden");
  }
  stats.classList.add("visible");
  getTime();
}

// Function for Night Mode toggle

function nightToggle() {
  night ? (night = false) : (night = true);
  document.querySelector("body").classList.toggle("lightmode");
  document.querySelector(".statistics").classList.toggle("lightmode");
  document.querySelector(".instructions").classList.toggle("lightmode");
  document.querySelector(".but-one").classList.toggle("lightbutton");
  document.querySelector(".but-two").classList.toggle("lightbutton");
  document.querySelector(".exit").classList.toggle("lightbutton");
  document.querySelector(".exit-2").classList.toggle("lightbutton");

  sun.classList.toggle("lightbutton");
  night
    ? (sun.innerHTML = `<i class="fas fa-sun"></i>`)
    : (sun.innerHTML = '<i class="fas fa-moon"></i>');
}
