//Functions for instructions visibility

function exitInstructions(e) {
  const instructions = document.getElementById("instructions");
  instructions.classList.remove("visible");
  instructions.classList.add("hidden");
}

function showInstrustions(e) {
  const instructions = document.getElementById("instructions");
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

//getTime();
