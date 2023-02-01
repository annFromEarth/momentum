const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const body = document.querySelector('.body');


function showTime() {
    const dateData = new Date();
    const currentTime = dateData.toLocaleTimeString();
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

function setLocalStorage() {
    localStorage.setItem('name', name.value);
}

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }

    else {name.placeholder = 'Your Name'}
}

window.addEventListener('load', getLocalStorage)


/********************    background image   ********************/

function getRandomNum() { return Math.floor(Math.random()*20+1)};

function setBg() {
    const dateData = new Date();
    const hours = dateData.getHours();

    timeOfDay = getTimeOfDay(hours);
    bgNum = getRandomNum().toString().padStart(2, "0");
    body.style.backgroundImage = `url(https://raw.github.com/annFromEarth/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg)`

    console.log(timeOfDay)
    console.log(bgNum)
}
setBg()


