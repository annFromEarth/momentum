import playList from './playlist.js';

const play = document.querySelector('.play');
const playNextButton = document.querySelector('.play-next');
const playPrevButton = document.querySelector('.play-prev');
const playListDiv = document.querySelector('.playlist')
const playlistTemplate = document.getElementById('playlist_template')
const songTitleInfo = document.querySelector('.song_title')

let isPlay = false;
let playNum = 0;

function makePlayList() {

    for(let i = 0; i < playList.length; i++) {

      const songItem = playlistTemplate.content.cloneNode(true);
      const songInfo = songItem.querySelector('.playlist_song_info');
      const songPlayToggle = songItem.querySelector('.playlist_play_btn');

      songInfo.textContent = playList[i].title  //+" / "+playList[i].duration;
      songPlayToggle.addEventListener('click', playAudio);
      songPlayToggle.id = `${i}`;

      playListDiv.appendChild(songItem);
    }
}


// function makePlayList() {
//     for(let i = 0; i < playList.length; i++) {
//         const li = document.createElement('li');
//         li.classList.add('play-item');
//         li.textContent = playList[i].title+" / "+playList[i].duration;
//         playListContainer.append(li);
//       }
//  }

makePlayList();

const audio = new Audio();

play.addEventListener('click', playAudio);
playNextButton.addEventListener('click', playNext);
playPrevButton.addEventListener('click', playPrev);
audio.onended = playNext;

function playAudio() {

    if (this.classList.contains("list")) {

        if(!isPlay) {

            playNum = this.id;

            audio.src = playList[playNum].file;
            audio.currentTime = 0;
            play.classList.add('pause');
            isPlay = true
            audio.play();
            
            playListDiv.children[playNum].firstElementChild.classList.add('playlist_pause')
            playListDiv.children[playNum].lastElementChild.classList.add('item-active')

            songTitleInfo.textContent = `${+playNum+1}. ${playList[playNum].title}`
        }
    
        else if(isPlay && this.id==playNum){

            play.classList.remove('pause');
            isPlay = false
            audio.pause();
            playListDiv.children[playNum].firstElementChild.classList.remove('playlist_pause')
            playListDiv.children[playNum].lastElementChild.classList.remove('item-active')

            songTitleInfo.textContent = `${+playNum+1}. ${playList[playNum].title}`

            
        }

        else if(isPlay && !(this.id==playNum)){

            play.classList.remove('pause');
            isPlay = false
            audio.pause();
            playListDiv.children[playNum].firstElementChild.classList.remove('playlist_pause');
            playListDiv.children[playNum].lastElementChild.classList.remove('item-active');

            playNum = this.id;
            console.log(this.id);
            console.log(playNum)

            audio.src = playList[playNum].file;
            audio.currentTime = 0;
            play.classList.add('pause');
            isPlay = true
            audio.play();
            
            playListDiv.children[playNum].firstElementChild.classList.add('playlist_pause')
            playListDiv.children[playNum].lastElementChild.classList.add('item-active')

            songTitleInfo.textContent = `${+playNum+1}. ${playList[playNum].title}`
        }
    } 

    else if  (!this.classList.contains("list")) {

        if(!isPlay) {

            audio.src = playList[playNum].file;
            audio.currentTime = 0;
            play.classList.add('pause');
            isPlay = true
            audio.play();
            
            playListDiv.children[playNum].firstElementChild.classList.add('playlist_pause')
            playListDiv.children[playNum].lastElementChild.classList.add('item-active')

            songTitleInfo.textContent = `${+playNum+1}. ${playList[playNum].title}`
        }
    
        else {
            play.classList.remove('pause');
            isPlay = false
            audio.pause();
            playListDiv.children[playNum].firstElementChild.classList.remove('playlist_pause')
            playListDiv.children[playNum].lastElementChild.classList.remove('item-active')

            songTitleInfo.textContent = `${+playNum+1}. ${playList[playNum].title}`
        }
    }
}

function playNextPrevAudio() {

    audio.src = playList[playNum].file;
    audio.currentTime = 0;
    play.classList.add('pause');
    isPlay = true
    audio.play();
}
  
function playNext() {

    if (playNum == (playList.length-1)) {
        playListDiv.children[playNum].firstElementChild.classList.remove('playlist_pause')
        playListDiv.children[playNum].lastElementChild.classList.remove('item-active')
        playNum = 0;
        playNextPrevAudio();
        playListDiv.children[playNum].firstElementChild.classList.add('playlist_pause')
        playListDiv.children[playNum].lastElementChild.classList.add('item-active')
        songTitleInfo.textContent = `${+playNum+1}. ${playList[playNum].title}`


    }  else {
        playListDiv.children[playNum].firstElementChild.classList.remove('playlist_pause')
        playListDiv.children[playNum].lastElementChild.classList.remove('item-active')
        playNum = +playNum+1;
        playNextPrevAudio();
        playListDiv.children[playNum].firstElementChild.classList.add('playlist_pause')
        playListDiv.children[playNum].lastElementChild.classList.add('item-active')
        songTitleInfo.textContent = `${+playNum+1}. ${playList[playNum].title}`
    }
} 

function playPrev() {

    if (playNum == 0 ) {
        playListDiv.children[playNum].firstElementChild.classList.remove('playlist_pause')
        playListDiv.children[playNum].lastElementChild.classList.remove('item-active')
        playNum = (playList.length-1);
        playNextPrevAudio();
        playListDiv.children[playNum].firstElementChild.classList.add('playlist_pause')
        playListDiv.children[playNum].lastElementChild.classList.add('item-active')
        songTitleInfo.textContent = `${+playNum+1}. ${playList[playNum].title}`
    } else {
        playListDiv.children[playNum].firstElementChild.classList.remove('playlist_pause')
        playListDiv.children[playNum].lastElementChild.classList.remove('item-active')
        playNum = +playNum-1;
        playNextPrevAudio();
        playListDiv.children[playNum].firstElementChild.classList.add('playlist_pause')
        playListDiv.children[playNum].lastElementChild.classList.add('item-active')
        songTitleInfo.textContent = `${+playNum+1}. ${playList[playNum].title}`
    }
}

// /*8************************************************************/


// const audioPlayer = document.querySelector(".audio-player");
// const audio = new Audio(
//   "https://ia800905.us.archive.org/19/items/FREE_background_music_dhalius/backsound.mp3"
// );
// //credit for song: Adrian kreativaweb@gmail.com

// console.dir(audio);

// audio.addEventListener(
//   "loadeddata",
//   () => {
//     audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
//       audio.duration
//     );
//     audio.volume = .75;
//   },
//   false
// );

// //click on timeline to skip around
// const timeline = audioPlayer.querySelector(".timeline");
// timeline.addEventListener("click", e => {
//   const timelineWidth = window.getComputedStyle(timeline).width;
//   const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
//   audio.currentTime = timeToSeek;
// }, false);

// //click volume slider to change volume
// const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
// volumeSlider.addEventListener('click', e => {
//   const sliderWidth = window.getComputedStyle(volumeSlider).width;
//   const newVolume = e.offsetX / parseInt(sliderWidth);
//   audio.volume = newVolume;
//   audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
// }, false)

// //check audio percentage and update time accordingly
// setInterval(() => {
//   const progressBar = audioPlayer.querySelector(".progress");
//   progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
//   audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
//     audio.currentTime
//   );
// }, 500);

// //toggle between playing and pausing on button click
// const playBtn = audioPlayer.querySelector(".controls .toggle-play");
// playBtn.addEventListener(
//   "click",
//   () => {
//     if (audio.paused) {
//       playBtn.classList.remove("play");
//       playBtn.classList.add("pause");
//       audio.play();
//     } else {
//       playBtn.classList.remove("pause");
//       playBtn.classList.add("play");
//       audio.pause();
//     }
//   },
//   false
// );

// audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
//   const volumeEl = audioPlayer.querySelector(".volume-container .volume");
//   audio.muted = !audio.muted;
//   if (audio.muted) {
//     volumeEl.classList.remove("icono-volumeMedium");
//     volumeEl.classList.add("icono-volumeMute");
//   } else {
//     volumeEl.classList.add("icono-volumeMedium");
//     volumeEl.classList.remove("icono-volumeMute");
//   }
// });

// //turn 128 seconds into 2:08
// function getTimeCodeFromNum(num) {
//   let seconds = parseInt(num);
//   let minutes = parseInt(seconds / 60);
//   seconds -= minutes * 60;
//   const hours = parseInt(minutes / 60);
//   minutes -= hours * 60;

//   if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
//   return `${String(hours).padStart(2, 0)}:${minutes}:${String(
//     seconds % 60
//   ).padStart(2, 0)}`;
// }