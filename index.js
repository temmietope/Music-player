let musicBanner = document.querySelector("#musicBanner");
const controlPad = document.querySelector("#controlPad");
const songDetails = document.querySelector("#song-details")
const songTitle = document.querySelector("#song-title");
const songArtist = document.querySelector("#song-artist");
const button = document.querySelector("button");
const prev = document.querySelector("#prev");
const playing = document.querySelector("#play-pause");
const stopped = document.querySelector("#stop");
const next = document.querySelector("#next");
const shuffle = document.querySelector("#shuffle");
const repeat = document.querySelector("#repeat");
const songRange = document.querySelector("#song-range");

let musicPlayer = new Audio();
let currentSong = 0;
songRange.value = 0;
toRepeat = false;

//function to load first song
function playSong(currentSong) {
  let s = songs.tracks[currentSong];
  songTitle.innerHTML = `<h2>${s.album.title}<h2>`;
  songArtist.innerHTML = `<h4>${s.artist.name}<h4>`;
  musicBanner.style.background = `url(${s.album.thumbnail})`;
  musicPlayer.src = s.url;
  pressPlay();
}
playSong(currentSong);

//to play or pause a song
function pressPlay() {
  if (musicPlayer.paused) {
    musicPlayer.play();
    playing.className = "fas fa-pause";
    playing.title = "Pause";
    console.log("playing");
  } else {
    musicPlayer.pause();
    playing.className = "fas fa-play";
    playing.title = "Play";
    console.log("pause");
  }
}
pressPlay();

//to play next song
function playNextSong() {
  if (toRepeat) {
    currentSong = currentSong - 1;
    console.log(currentSong);
  }
  currentSong = currentSong + 1;
  console.log(currentSong);
  if (currentSong >= songs.tracks.length) {
    currentSong = 0;
    playSong(currentSong);
  }
  playSong(currentSong);
}

//to play previous song
function playPreviousSong() {
  currentSong = currentSong - 1;
  console.log(currentSong);
  if (currentSong < 0) {
    currentSong = songs.tracks.length - 1;
    playSong(currentSong);
  }
  playSong(currentSong);
}

//to stop music
function stopSong() {
  musicPlayer.currentTime = 0;
  musicPlayer.pause();
  playing.className = "fas fa-play";
}

//to shuffle music
function shuffleMusic() {
  let rand = Math.round(Math.random() * songs.tracks.length);
  console.log(rand);
  currentSong = rand;
  playSong(currentSong);
}

//on window load
window.onload = function() {
  playing.className = "fas fa-play";
};

playing.addEventListener("click", pressPlay);
next.addEventListener("click", playNextSong);
prev.addEventListener("click", playPreviousSong);
stopped.addEventListener("click", stopSong);
shuffle.addEventListener("click", shuffleMusic);
repeat.addEventListener("click", function() {
  toRepeat = true;
  musicPlayer.onended = function() {
    return (toRepeat = false);
    playNextSong();
  };
});


musicPlayer.addEventListener("timeupdate", () => {
  timer = Math.round((musicPlayer.currentTime / musicPlayer.duration) * 100);
  songRange.value = timer;
});
songRange.addEventListener("click", function() {
  let pos = this.value;
  songRange.value = pos;
  currentTime = (pos / 100) * musicPlayer.duration;
  musicPlayer.currentTime = currentTime;
  console.log(pos, currentTime);
});
musicPlayer.addEventListener("ended", () => {
  playNextSong();
});
