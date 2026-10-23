const sounds = {
  w: "tom-4.mp3",
  a: "tom-2.mp3",
  s: "tom-3.mp3",
  d: "tom-1.mp3",
  j: "snare.mp3",
  k: "crash.mp3",
  l: "kick-bass.mp3"
};

const buttons = document.querySelectorAll(".drum");
const status = document.getElementById("status");
const audioPlayers = {};

for (const [key, path] of Object.entries(sounds)) {
  audioPlayers[key] = new Audio(path);
  audioPlayers[key].preload = "auto";
}

function playDrum(key) {
  const player = audioPlayers[key];
  if (!player) return;

  player.currentTime = 0;
  player.play().catch(() => {
    status.textContent = "Sound could not play. Try clicking a drum again.";
  });

  const button = document.querySelector(`.drum[data-key="${key}"]`);
  if (button) {
    button.classList.add("pressed");
    window.setTimeout(() => button.classList.remove("pressed"), 110);
  }
  status.textContent = `Playing: ${key.toUpperCase()}`;
}

buttons.forEach((button) => {
  button.addEventListener("click", () => playDrum(button.dataset.key));
});

document.addEventListener("keydown", (event) => {
  if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;
  const key = event.key.toLowerCase();
  if (Object.hasOwn(sounds, key)) playDrum(key);
});
