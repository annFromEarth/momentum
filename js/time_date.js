const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const body = document.querySelector('.body');
let randomNum


function showTime() {
    const dateData = new Date();
    const currentTime = dateData.toLocaleTimeString('en-US', {hour12:false, hourCycle: 'h24'});
    time.textContent = currentTime;

    const options = {weekday: 'long', day: 'numeric', month: 'long'};
    const currentDate = dateData.toLocaleDateString('en-US', options)
    date.textContent = currentDate;

    const hours = dateData.getHours();
    greeting.textContent = `Good ${getTimeOfDay(hours)}, `

    setTimeout(showTime, 1000);
}

function getTimeOfDay(x) {

    let morning = [06, 07, 08, 09, 10, 11];
    let afternoon = [12, 13, 14, 15, 16, 17];
    let evening = [18, 19, 20, 21, 22, 23];
    let night = [00, 01, 02, 03, 04, 05];

    if (morning.includes(x)) return 'morning';
    if (afternoon.includes(x)) return 'afternoon';
    if (evening.includes(x)) return 'evening';
    else return 'night';

}

showTime();

// function setLocalStorage() {
//     localStorage.setItem('name', name.value);
// }

// window.addEventListener('beforeunload', setLocalStorage);

// function getLocalStorage() {
//     if (localStorage.getItem('name')) {
//         name.value = localStorage.getItem('name');
//     }

//     else {name.placeholder = 'Your Name'}
// }

// window.addEventListener('load', getLocalStorage)


/********************    background image init   ********************/

function getRandomNum() { randomNum = Math.floor(Math.random()*20+1)};
getRandomNum();
console.log(randomNum)

function setBg() {
    const dateData = new Date(); //????here
    const hours = dateData.getHours(); //????here

    timeOfDay = getTimeOfDay(hours);   //????const
    bgNum = randomNum.toString().padStart(2, "0");   //????const

    const img = new Image();
    img.src = `https://raw.github.com/annFromEarth/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
    
    img.onload = () => {      
        body.style.backgroundImage = `url(${img.src})`;
      };  
}

setBg()

/********************    background image slider   ********************/

function getSlideNext() {
    randomNum ==20 ? randomNum = 1 : randomNum = randomNum+1;
    setBg();
    console.log(randomNum)
}

function getSlidePrev() { 
    randomNum ==1 ? randomNum = 20 : randomNum = randomNum-1;
    setBg();
    console.log(randomNum)
}

const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

slideNext.addEventListener('click', getSlideNext)
slidePrev.addEventListener('click', getSlidePrev)



