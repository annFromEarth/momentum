import playList from './playlist.js';

const play = document.querySelector('.play');
const playNextButton = document.querySelector('.play-next');
const playPrevButton = document.querySelector('.play-prev');

const playListContainer = document.querySelector('.play-list')


let isPlay = false;
let playNum = 0;

function makePlayList() {
    for(let i = 0; i < playList.length; i++) {
        const li = document.createElement('li');
        li.classList.add('play-item');
        li.textContent = playList[i].title;
        playListContainer.append(li);
      }
    console.log('goo')
}

makePlayList();

console.log(playListContainer.childNodes[0]);

// playList.forEach(i => {
//     li.classList.add('play-item');
//     li.textContent = playList[i].title;
//     playListContainer.append(li)
//   })

const audio = new Audio();

play.addEventListener('click', playAudio);
playNextButton.addEventListener('click', playNext);
playPrevButton.addEventListener('click', playPrev);
audio.onended = playNext;
// audio.onended = function pplayNext() {
//     if (playNum == (playList.length-1)) {
//         playListContainer.childNodes[playNum].classList.remove('item-active')
//         playNum = 0;
//         playNextPrevAudio();
//         playListContainer.childNodes[playNum].classList.add('item-active')
//     }  else {
//         playListContainer.childNodes[playNum].classList.remove('item-active')
//         playNum = playNum+1;
//         playNextPrevAudio();
//         playListContainer.childNodes[playNum].classList.add('item-active')
//     }
// };



function playAudio() {

    if(!isPlay) {

        audio.src = playList[playNum].file;
        audio.currentTime = 0;
        play.classList.add('pause');
        isPlay = true
        audio.play();
        
        playListContainer.childNodes[playNum].classList.add('item-active')
    }

    else {

        play.classList.remove('pause');
        isPlay = false
        audio.pause();

        // playListContainer.childNodes[playNum].classList.remove('item-active')
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
        playListContainer.childNodes[playNum].classList.remove('item-active')
        playNum = 0;
        playNextPrevAudio();
        playListContainer.childNodes[playNum].classList.add('item-active')
    }  else {
        playListContainer.childNodes[playNum].classList.remove('item-active')
        playNum = playNum+1;
        playNextPrevAudio();
        playListContainer.childNodes[playNum].classList.add('item-active')
    }
} 

function playPrev() {

    if (playNum == 0 ) {
        playListContainer.childNodes[playNum].classList.remove('item-active')
        playNum = (playList.length-1);
        playNextPrevAudio();
        playListContainer.childNodes[playNum].classList.add('item-active')
    } else {
        playListContainer.childNodes[playNum].classList.remove('item-active')
        playNum = playNum-1;
        playNextPrevAudio();
        playListContainer.childNodes[playNum].classList.add('item-active')
    }
}