const instructions = document.getElementById("instructions");
const stats = document.getElementById("statistics");
const confirm = document.getElementById("confirm-msg");

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
