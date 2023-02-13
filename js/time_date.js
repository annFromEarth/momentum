import dictionary from './dictionary.js';
import state from './state.js';

const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const body = document.querySelector('.body');
let randomNum
let locale

export function setLocale() {
    if (localStorage.getItem('language') == 'ru' ) {
        locale='ru-RU';
    }
    else {locale='en-US';}
}

setLocale()

window.addEventListener('beforeunload', setLocalStorageName);

window.addEventListener('load', getLocalStorageName)

export function getLocalStorageName() {

    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }

    else {
    // name.value = "";
     
    if (localStorage.language =='ru' ) {
        name.placeholder = '[ Ваше имя ]'
    }

    else {
        name.placeholder = '[ Your Name ]'
    }
}
}

function setLocalStorageName() {
    localStorage.setItem('name', name.value);
}

export function showTime() {

    const dateData = new Date();
    const currentTime = dateData.toLocaleTimeString(`${locale}`, {hour12:false, hourCycle: 'h24'});
    time.textContent = currentTime;
    const options = {weekday: 'long', day: 'numeric', month: 'long'};
    const hours = dateData.getHours();

    // if (!localStorage.getItem('language'))

    if (localStorage.getItem('language') == 'ru' ) {
        const currentDate = dateData.toLocaleDateString('ru-RU', options);
        date.textContent = currentDate;
        greeting.textContent = `${getTimeOfDayPhrase(hours)}, `;
    }

    else {
        const currentDate = dateData.toLocaleDateString('en-US', options);
        date.textContent = currentDate;
        greeting.textContent = `${getTimeOfDayPhrase(hours)}, `;
    } 

    setTimeout(showTime, 1000);
}

function getTimeOfDayPhrase(x) {

    let morning = [6, 7, 8, 9, 10, 11];
    let afternoon = [12, 13, 14, 15, 16, 17];
    let evening = [18, 19, 20, 21, 22, 23];
    // let night = [00, 01, 02, 03, 04, 05];

    if (localStorage.getItem('language') == 'ru' ) {
        if (morning.includes(x)) return 'Доброе утро';
    if (afternoon.includes(x)) return 'Добрый день';
    if (evening.includes(x)) return 'Добрый вечер';
    else return 'Доброй ночи';

    }
    else {
        if (morning.includes(x)) return 'Good morning';
    if (afternoon.includes(x)) return 'Good afternoon';
    if (evening.includes(x)) return 'Good evening';
    else return 'Good night';
    }

}

function getTimeOfDay(x) {

    let morning = [6, 7, 8, 9, 10, 11];
    let afternoon = [12, 13, 14, 15, 16, 17];
    let evening = [18, 19, 20, 21, 22, 23];
    // let night = [00, 01, 02, 03, 04, 05];

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

function setBg() {
    const dateData = new Date(); //????here
    const hours = dateData.getHours(); //????here

    let timeOfDay = getTimeOfDay(hours);   //????const
    let bgNum = randomNum.toString().padStart(2, "0");   //????const

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



