"use strict";

const player = document.querySelector(".player");
const video = document.querySelector(".video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.getElementById("play-btn");
const volumeIcon = document.getElementById("volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const speed = document.querySelector(".player-speed");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const fullscreenBtn = document.querySelector(".fullscreen");

// Initial
let currentVolume = 1;
let fullScreen = false;

const togglePlay = () => {
  playBtn.className = "fas";

  if (video.paused) {
    video.play();
    playBtn.classList.toggle("fa-pause");
  } else {
    video.pause();
    playBtn.classList.toggle("fa-play");
  }
};

video.addEventListener("timeupdate", () => {
  const videoDuration = video.duration;
  const videoCurrent = video.currentTime;

  const durationMinute = String(Math.floor(videoDuration / 60)).padStart(2, 0);
  const durationSecond = String(Math.floor(videoDuration % 60)).padStart(2, 0);

  const currentMinute = String(Math.floor(videoCurrent / 60)).padStart(2, 0);
  const currentSecond = String(Math.floor(videoCurrent % 60)).padStart(2, 0);

  currentTime.innerText = `${currentMinute}:${currentSecond} /`;
  duration.innerText = `${durationMinute}:${durationSecond}`;

  progressBar.style.width = `${(videoCurrent / videoDuration) * 100}%`;
});

progressRange.addEventListener("click", (e) => {
  const clicked = e.offsetX;
  const width = progressRange.clientWidth;
  video.currentTime = `${(clicked / width) * video.duration}`;
});

volumeRange.addEventListener("click", (e) => {
  const clicked = e.offsetX;
  const width = volumeRange.clientWidth;
  let volume = clicked / width;
  currentVolume = volume;

  if (volume >= 0.9) {
    volume = 1;
  }

  if (volume <= 0.1) {
    volume = 0;
  }

  volumeIcon.className = "fas";

  if (volume >= 0.5) {
    volumeIcon.classList.add("fa-volume-up");
  }
  if (volume <= 0.5 && volume > 0) {
    volumeIcon.classList.add("fa-volume-down");
  }
  if (volume === 0) {
    volumeIcon.classList.add("fa-volume-mute");
  }

  video.volume = volume;
  volumeBar.style.width = `${volume * 100}%`;
  console.log(clicked, width);
});

const toggleVolume = () => {
  volumeIcon.className = "fas";

  if (video.volume) {
    volumeBar.style.width = 0;
    video.volume = 0;
    volumeIcon.classList.add("fa-volume-mute");

    console.log("test");
  } else {
    volumeBar.style.width = `${currentVolume * 100}%`;
    video.volume = currentVolume;
    volumeIcon.classList.add("fa-volume-up");
  }
};

function openFullscreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  }
}

// AddEventListeners
video.addEventListener("click", togglePlay);
playBtn.addEventListener("click", togglePlay);
volumeIcon.addEventListener("click", toggleVolume);
fullscreenBtn.addEventListener("click", openFullscreen);

speed.addEventListener("change", () => {
  video.playbackRate = speed.value;
});

window.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    togglePlay();
  }
  if (e.code === "KeyM") {
    toggleVolume();
  }

  if (e.code === "KeyF") {
    openFullscreen();
  }
});
m;
