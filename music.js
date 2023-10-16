// Music data array containing information about songs
const musicData = [
  {
    img: "./music/diab.jpg",
    name: "Banadek Talaa",
    artist: "Amr Diab",
    music: "./music/Amr Diab...Banadek Taala.mp3",
  },
  {
    img: "./music/amr_moustafa.jpg",
    name: "Ana Nseteek",
    artist: "Amr Moustafa",
    music: "music/Amr Moustafa - Ana Nseetek.mp3",
  },
  {
    img: "./music/Coldplay.jpg",
    name: "A Sky Full Of Stars",
    artist: " Cold Play",
    music: "music/Coldplay - A Sky Full Of Stars (Official Video).mp3",
  },
];

// Get DOM elements
const playPauseBtn = document.querySelector(".play-pause-btn");
const timelineContainer = document.querySelector(".timeline-container");
const timeline = document.querySelector(".timeline");
const thumbIndicator = document.querySelector(".thumb-indicator");
const volumeSlider = document.querySelector(".volume-slider");
const audio = document.querySelector(".audio");
const image = document.querySelector(".image-wrapper .image");
const title = document.querySelector(".song-title");
const artist = document.querySelector(".song-artist");
const next = document.querySelector(".next-btn");
const prev = document.querySelector(".prev-btn");
const replay = document.querySelector(".replay-btn");
const repeatBtn = document.querySelector(".shuffle-btn ").querySelector("span");
const playButton = document.getElementById("play-pause");

// Initialize variables
let isPlaying = false;
let index = 0;

// Function to load music based on index
function loadMusic(index) {
  audio.src = musicData[index].music;
  image.src = musicData[index].img;
  title.textContent = musicData[index].name;
  artist.textContent = musicData[index].artist;
  document.body.style.backgroundImage = `url(${musicData[index].img})`;
}

// Load the first music when the window loads
window.addEventListener("load", () => {
  loadMusic(index);
});

// Function to play music
function playmusic() {
  isPlaying = true;
  audio.play();
  playButton.innerHTML = "pause";
}

// Function to pause music
function pausemusic() {
  isPlaying = false;
  audio.pause();
  playButton.innerHTML = "play";
}

// Event listener for play/pause button click
playButton.addEventListener("click", (e) => {
  e.preventDefault();
  isPlaying ? pausemusic() : playmusic();
});

// Function to play the next music in the array
function nextMusic() {
  index++;
  if (index > musicData.length - 1) {
    index = 0;
  } else {
    index = index;
  }
  loadMusic(index);
  playmusic();
}

// Function to play the previous music in the array
function previousMusic() {
  index--;
  if (index < 0) {
    index = 0;
  } else {
    index = index;
  }
  loadMusic(index);
  playmusic();
}

// Event listener for next button click
next.addEventListener("click", (e) => {
  e.preventDefault();
  nextMusic();
});

// Event listener for previous button click
prev.addEventListener("click", (e) => {
  e.preventDefault();
  previousMusic();
});

// Event listener for repeat button click
repeatBtn.addEventListener("click", () => {
  let getText = repeatBtn.innerHTML;
  switch (getText) {
    case "repeat":
      repeatBtn.innerHTML = "repeat_one";
      repeatBtn.setAttribute("title", "Song looped");
      break;
    case "repeat_one":
      repeatBtn.innerHTML = "shuffle";
      repeatBtn.setAttribute("title", "Playback shuffled");
      break;
    case "shuffle":
      repeatBtn.innerHTML = "repeat";
      repeatBtn.setAttribute("title", "Playlist looped");
      break;
  }
});

// Event listener for audio end event
audio.addEventListener("ended", () => {
  let getText = repeatBtn.innerText;
  switch (getText) {
    case "repeat":
      nextMusic();
      break;
    case "repeat_one":
      audio.currentTime = 0;
      loadMusic(index);
      playmusic();
      break;
    case "shuffle":
      let randIndex = Math.floor(Math.random() * musicData.length);
      while (index == randIndex) {
        randIndex = Math.floor(Math.random() * musicData.length);
      }
      index = randIndex;
      loadMusic(index);
      playmusic();
      break;
  }
});

// Event listener for audio timeupdate event
audio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  timeline.style.width = `${progressWidth}%`;

  // Update// Update music current time and duration
  let musicCurrentTime = document.querySelector(".current-time");
  let musicDuration = document.querySelector(".total-time");

  audio.addEventListener("loadeddata", () => {
    const interval = setInterval(() => {
      const _elapsed = audio.currentTime;
      musicCurrentTime.innerHTML = formatTime(_elapsed);
    }, 1000);
    const _duration = audio.duration;
    musicDuration.innerHTML = formatTime(_duration);
    audio.addEventListener("ended", () => {
      clearInterval(interval);
    });
  });
});

// Event listener for timeline container click
timelineContainer.addEventListener("click", (e) => {
  progressWidth = timelineContainer.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = audio.duration;

  audio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
  playmusic();
});

// Function to format time in minutes and seconds
function formatTime(time) {
  if (time && !isNaN(time)) {
    const minutes =
      Math.floor(time / 60) < 10
        ? `0${Math.floor(time / 60)}`
        : Math.floor(time / 60);
    const seconds =
      Math.floor(time % 60) < 10
        ? `0${Math.floor(time % 60)}`
        : Math.floor(time % 60);
    return `${minutes}:${seconds}`;
  }
  return "00:00";
}
function repeatTrack() {
  loadMusic(index);
  playmusic();
}
replay.addEventListener("click", (e) =>{
  e.preventDefault();
  repeatTrack()
})
