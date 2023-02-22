import dictionary from './dictionary.js';
import state from './state.js';

const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const body = document.querySelector('.body');
let background_source="";
let timeOfDay;

const optionsSrc = document.querySelectorAll('.option.src')

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

/********************    background image init   ********************/

function getRandomNum() { randomNum = Math.floor(Math.random()*20+1)};
getRandomNum();

function setBgGithub() {
    const dateData = new Date(); //????here
    const hours = dateData.getHours(); //????here

    timeOfDay = getTimeOfDay(hours);   //????const
    let bgNum = randomNum.toString().padStart(2, "0");   //????const

    const img = new Image();
    img.src = `https://raw.github.com/annFromEarth/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
    
    img.onload = () => {      
        body.style.backgroundImage = `url(${img.src})`;
      };  
}



/********************    background image slider   ********************/

function getSlideNext() {

     if (background_source=="github") {
    randomNum ==20 ? randomNum = 1 : randomNum = randomNum+1;
    setBgGithub();

     } else if (background_source=="unsplash") { getBackgroundUnsplash();
        
     } else if (background_source=="flickr") { getBackgroundFlickr(); }
}


function getSlidePrev() { 

    if (background_source=="github") {
        randomNum ==1 ? randomNum = 20 : randomNum = randomNum-1;
        setBgGithub();
    } else if (background_source=="unsplash") { getBackgroundUnsplash();
        
    } else if (background_source=="flickr") { getBackgroundFlickr(); }  
}

const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

slideNext.addEventListener('click', getSlideNext)
slidePrev.addEventListener('click', getSlidePrev)

/********************    background sources init   ********************/

function initBackgroundSource() {
    if (localStorage.getItem('background_src')) {
        background_source = localStorage.getItem('background_src');
        document.querySelector(`.${localStorage.getItem('background_src')}`).classList.add('selected');
    }

    else {
        background_source = "github";
        document.querySelector(`.github`).classList.add('selected')
    }

    setBackroungOfSource();
}

initBackgroundSource()

/********************    background sources save   ********************/


function saveBackgroundSource() {
    localStorage.setItem('background_src', background_source)
}

/*choose background source css*/

optionsSrc.forEach(x => x.addEventListener ('click', selectOptionSrc));

function selectOptionSrc(y) {

  let optionsSrcSelected = document.querySelector('.option.src.selected');
 
  if (optionsSrcSelected) {
    optionsSrcSelected.classList.remove('selected');
    y.target.classList.add('selected');
    background_source = y.target.value;
    saveBackgroundSource();
    setBackroungOfSource();
  }
  else {
    y.target.classList.toggle('selected');
    background_source = y.target.value;
    saveBackgroundSource;
    setBackroungOfSource();
  }
}

/******** function setBackroungOfSource */

function setBackroungOfSource() {
    if (background_source == "github") {
        setBgGithub()
    }

    if (background_source == "unsplash") {
        getBackgroundUnsplash()
    }

    if (background_source == "flickr") {
        getBackgroundFlickr();
    }
}


/****set background by Flickr */

async function getBackgroundFlickr() {
    try {
      const urlFlickr = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=3119e9b655c079e1d987c8984edf920d&tags=${timeOfDay},nature&per_page=20&extras=url_l&format=json&nojsoncallback=1`;
      const resFlickr = await fetch(urlFlickr);
      const dataFlickr = await resFlickr.json(); 


    let randomF

    function getRandomF(length) { randomF = Math.floor(Math.random()*length)};
    getRandomF(dataFlickr.photos.photo.length);

      const backgroundURL = dataFlickr.photos.photo[`${randomF}`].url_l;

      const img = new Image();
        img.src = backgroundURL;
    
        img.onload = () => {      
            body.style.backgroundImage = `url(${img.src})`;
          }; 
    }

    catch {
        console.log ("smth went wrong with Flickr")
    }
}


//****set background by Unsplash */

async function getBackgroundUnsplash() { 
    try {

        const urlUnsplash = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}+nature&client_id=pTHkMom4S0FG6gq99WjCH4akB6LnTnZBOYWhIjAzsoo`;
        const resUnsplash = await fetch(urlUnsplash);
        const dataUnsplash = await resUnsplash.json(); 
        const img_urlUnsplash = dataUnsplash.urls.regular;

        const img = new Image();
        img.src = img_urlUnsplash;
    
        img.onload = () => {      
            body.style.backgroundImage = `url(${img.src})`;
          }; 
    }

    catch {
        console.log ("smth went wrong with Unsplash");
    }
}








