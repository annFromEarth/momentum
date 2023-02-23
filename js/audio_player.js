import playList from './playlist.js';

const play = document.querySelector('.play');
const playNextButton = document.querySelector('.play-next');
const playPrevButton = document.querySelector('.play-prev');
const playListDiv = document.querySelector('.playlist')
const playlistTemplate = document.getElementById('playlist_template')
const songTitleInfo = document.querySelector('.song_title')
const songTimeTotal = document.querySelector('.time_length')
const songTimeProgress = document.querySelector('.time_current')
const timebarTotal = document.querySelector('.progress_bar')
const timebarCurrent = document.querySelector('.progress_fill')
const volumeSlider = document.querySelector('.volume-slider')

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

makePlayList();

const audio = new Audio();

play.addEventListener('click', playAudio);
playNextButton.addEventListener('click', playNext);
playPrevButton.addEventListener('click', playPrev);
audio.onended = playNext;

function playAudio() {

    if (this.classList.contains("list")) {

        if(!isPlay  && !(this.id==playNum)) {

            playNum = this.id;

            audio.src = playList[playNum].file;
            audio.currentTime = 0;
            audio.volume = .75;
            setSccVolume()
            play.classList.add('pause');
            isPlay = true
            audio.play();
            
            playListDiv.children[playNum].firstElementChild.classList.add('playlist_pause')
            playListDiv.children[playNum].lastElementChild.classList.add('item-active')
            return
        }

        if(!isPlay  && this.id==playNum) {
            
            playNum = this.id;

            if (!audio.src) {
                
                audio.src = playList[playNum].file;
                audio.currentTime = 0;
                audio.volume = .75;
                setSccVolume()
            }

            play.classList.add('pause');
            isPlay = true
            audio.play();
            
            playListDiv.children[playNum].firstElementChild.classList.add('playlist_pause')
            playListDiv.children[playNum].lastElementChild.classList.add('item-active')
            return
        }
    
        else if(isPlay && this.id==playNum){

            play.classList.remove('pause');
            isPlay = false
            audio.pause();
            playListDiv.children[playNum].firstElementChild.classList.remove('playlist_pause')
            playListDiv.children[playNum].lastElementChild.classList.remove('item-active')   
            return
        }

        else if(isPlay && !(this.id==playNum)){

            play.classList.remove('pause');
            isPlay = false
            audio.pause();
            playListDiv.children[playNum].firstElementChild.classList.remove('playlist_pause');
            playListDiv.children[playNum].lastElementChild.classList.remove('item-active');

            playNum = this.id;

            audio.src = playList[playNum].file;
            audio.currentTime = 0;
            audio.volume = .75;
            setSccVolume()
            play.classList.add('pause');
            isPlay = true
            audio.play();
            
            playListDiv.children[playNum].firstElementChild.classList.add('playlist_pause')
            playListDiv.children[playNum].lastElementChild.classList.add('item-active')
            return
        }
    } 

    else if  (!this.classList.contains("list")) {

        if(!isPlay) {
            if (!audio.src) {

                audio.src = playList[playNum].file;
                audio.currentTime = 0;
                audio.volume = .75;
                setSccVolume()
            }

            play.classList.add('pause');
            isPlay = true
            audio.play();
            
            playListDiv.children[playNum].firstElementChild.classList.add('playlist_pause')
            playListDiv.children[playNum].lastElementChild.classList.add('item-active')
            songTitleInfo.textContent = `${+playNum+1}. ${playList[playNum].title}`
            songTimeTotal.textContent = `${playList[playNum].duration}`

            return
        }
    
        else {
            play.classList.remove('pause');
            isPlay = false
            audio.pause();
            playListDiv.children[playNum].firstElementChild.classList.remove('playlist_pause')
            playListDiv.children[playNum].lastElementChild.classList.remove('item-active')
            songTitleInfo.textContent = `${+playNum+1}. ${playList[playNum].title}`
            songTimeTotal.textContent = `${playList[playNum].duration}`  

            return
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

    }  else {
        playListDiv.children[playNum].firstElementChild.classList.remove('playlist_pause')
        playListDiv.children[playNum].lastElementChild.classList.remove('item-active')
        playNum = +playNum+1;
        playNextPrevAudio();
        playListDiv.children[playNum].firstElementChild.classList.add('playlist_pause')
        playListDiv.children[playNum].lastElementChild.classList.add('item-active')
    }

    songTitleInfo.textContent = `${+playNum+1}. ${playList[playNum].title}`
    songTimeTotal.textContent = `${playList[playNum].duration}`
} 

function playPrev() {

    if (playNum == 0 ) {
        playListDiv.children[playNum].firstElementChild.classList.remove('playlist_pause')
        playListDiv.children[playNum].lastElementChild.classList.remove('item-active')
        playNum = (playList.length-1);
        playNextPrevAudio();
        playListDiv.children[playNum].firstElementChild.classList.add('playlist_pause')
        playListDiv.children[playNum].lastElementChild.classList.add('item-active')
 
    } else {
        playListDiv.children[playNum].firstElementChild.classList.remove('playlist_pause')
        playListDiv.children[playNum].lastElementChild.classList.remove('item-active')
        playNum = +playNum-1;
        playNextPrevAudio();
        playListDiv.children[playNum].firstElementChild.classList.add('playlist_pause')
        playListDiv.children[playNum].lastElementChild.classList.add('item-active')
    }

    songTitleInfo.textContent = `${+playNum+1}. ${playList[playNum].title}`
    songTimeTotal.textContent = `${playList[playNum].duration}`
}

//click on timeline to skip around

timebarTotal.addEventListener ('click', e => {
    if (audio.src) {
        const timelineWidth = window.getComputedStyle(timebarTotal).width;    
    const timeToSeek = e.offsetX / parseInt(timelineWidth) * playList[playNum].durationS;
    audio.currentTime = timeToSeek;
    } }, false);

//check audio percentage and update time accordingly
setInterval(() => {
    timebarCurrent.style.width = audio.currentTime / playList[playNum].durationS * 100 + "%";
    songTimeProgress.textContent = getTimeCodeFromNum(audio.currentTime);
}, 1000);

function getTimeCodeFromNum(num) {
    let minutes = Math.floor(num/60);
    let seconds = Math.round(num%60);

    return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}

//click volume slider to change volume

volumeSlider.addEventListener('click', e => {
      const sliderWidth = window.getComputedStyle(volumeSlider).width;
      const newVolume = e.offsetX / parseInt(sliderWidth);
      audio.volume = newVolume;
      document.querySelector(".volume-percentage").style.width = newVolume * 100 + '%';
    }, false)

function setSccVolume() {
    document.querySelector(".volume-percentage").style.width = audio.volume * 100 + '%'
}


document.querySelector(".volume-btn").addEventListener("click", () => {
          const muteOrVolume = document.querySelector(".volume");
          audio.muted = !audio.muted;
          if (audio.muted) {
            muteOrVolume.classList.remove("volumeMedium");
            muteOrVolume.classList.add("volumeMute");
          } else {
            muteOrVolume.classList.add("volumeMedium");
            muteOrVolume.classList.remove("volumeMute");
          }
        });

