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
