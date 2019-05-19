let musicBanner = document.querySelector("#musicBanner");
const controlPad = document.querySelector("#controlPad");
const songTitle = document.querySelector("#song-title");
const songArtist = document.querySelector("#song-artist");
const button = document.querySelector("button");
const prev = document.querySelector("#prev");
const playing = document.querySelector("#play-pause");
const stopped = document.querySelector("#stop");
const next = document.querySelector("#next");
const shuffle = document.querySelector("#shuffle");
const songRange = document.querySelector("#song-range");

let musicPlayer = new Audio();
let currentSong = 0;

//function to load first song
function playSong(currentSong) {
  let s = songs.tracks[currentSong];
  songTitle.innerHTML = s.album.title;
  songArtist.innerHTML = s.artist.name;
  musicBanner.style.background = `url(${s.album.thumbnail})`;
  musicPlayer.src = s.url;
  // pressPlay();
}
playSong(currentSong);

//to play or pause a song
function pressPlay() {
  if (musicPlayer.paused) {
    musicPlayer.play();
    playing.className = "fas fa-pause";
    console.log("playing");
  } else {
    musicPlayer.pause();
    playing.className = "fas fa-play";
    console.log("pause");
    console.log(playing.firstChild);
    console.log(playing.firstChild.className);
  }
}
pressPlay();

//to play next song
function playNextSong() {
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
  playSong(currentSong);
  playing.className = "fas fa-play";
};

playing.addEventListener("click", pressPlay);
next.addEventListener("click", playNextSong);
prev.addEventListener("click", playPreviousSong);
stopped.addEventListener("click", stopSong);
shuffle.addEventListener("click", shuffleMusic);
musicPlayer.addEventListener("click", playNextSong);

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
// if(isPlaying){
//     musicPlayer.pause()
// }else{
//     musicPlayer.play();
// }
// musicPlayer.onplaying = function(){
//     isPlaying = true;
// }
// musicPlayer.onpause = function(){
//     isPlaying = false;
// }

// stop.onclick
