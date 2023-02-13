import state from './state.js';
import {translateQuote} from './quotes.js';
import {getWeather} from './weather.js';
import {setLocale} from './time_date.js';
import {showTime} from './time_date.js';
import {getLocalStorageName} from './time_date.js'
import {getLocalStorageCity} from './weather.js'
import {setLocalStorageCity} from './weather.js'
import {getLang} from './weather.js'

const btnSettings = document.querySelector('.settings_button')
const divSettings = document.querySelector('.settings')
const options = document.querySelectorAll('.option')

const language_set = document.querySelector('.language_set')
const background_set = document.querySelector('.background_set')
const hide_set = document.querySelector('.hide_set')

const optionsLanguage = document.querySelectorAll('.option.language')
const optionsBlock = document.querySelectorAll('.option.block')
const optionsSrc = document.querySelectorAll('.option.src')

/*settings inner text of language*/

function translateSettings() {
  if (state.languages == 'ru' ) {
    language_set.textContent = "Язык:";
    background_set.textContent = "Источник фона:";
    hide_set.textContent = "Скрытие блоков:";
  }
  else {
    language_set.textContent = "Language:";
    background_set.textContent = "Background src:";
    hide_set.textContent = "Hide blocks:";
  }
}
translateSettings();


/*show settings menu*/

btnSettings.addEventListener('click', showSettings);

function showSettings() {
    divSettings.classList.toggle('active')
}

/***********************outside click close***********************/

document.addEventListener('click', (e) => {
  const withinBoundaries = e.composedPath().includes(divSettings);
  const withinSettingsButton = e.composedPath().includes(btnSettings);

  if (!withinBoundaries && !withinSettingsButton && divSettings.classList.contains('active')) {
    divSettings.classList.remove('active');
  }
})

/*choose language css*/

optionsLanguage.forEach(x => x.addEventListener ('click', selectOptionLanguage));

function selectOptionLanguage(y) {

  let optionsLanguageSelected = document.querySelector('.option.language.selected');
 
  if (optionsLanguageSelected) {
    optionsLanguageSelected.classList.remove('selected');
    y.target.classList.add('selected');
  }
  else {
    y.target.classList.toggle('selected');
  }
}

/****change language js */

optionsLanguage.forEach(x => x.addEventListener ('click', changeLanguage));

function changeLanguage(e) {

  console.log(localStorage.getItem('city'));
  console.log(localStorage.getItem('language'));
  console.log(state.languages);

  state.languages = e.target.textContent;
  setLocalStorageLanguage();
  translateSettings();
  getLang();
  getLocalStorageName();
  getLocalStorageCity();
  setLocalStorageCity();
  translateQuote();
  getWeather();
  setLocale();
  showTime();
  // getLocalStorageCity();
  // setLocalStorageCity();

  console.log(localStorage.getItem('city'));
  console.log(localStorage.getItem('language'));
  console.log(state.languages);
}

/*choose background source css*/

optionsSrc.forEach(x => x.addEventListener ('click', selectOptionSrc));

function selectOptionSrc(y) {

  let optionsSrcSelected = document.querySelector('.option.src.selected');
 
  if (optionsSrcSelected) {
    optionsSrcSelected.classList.remove('selected');
    y.target.classList.add('selected');
  }
  else {
    y.target.classList.toggle('selected');
  }
}

/*hide blocks css*/

let arr = [];

function initHiddenBlocksArray() {
  if (!(localStorage.hidden_blocks == "" )) {
   arr = localStorage.getItem('hidden_blocks').split(',')
   console.log("wow")
  }
}

initHiddenBlocksArray()

console.log(arr)


  function makeHiddenArray(y) {

    if (arr.includes(y.target.value)) {
      arr = arr.filter(i => !(i == y.target.value));
      localStorage.setItem('hidden_blocks', arr); 
    }
    else {
    arr.push(y.target.value);
    localStorage.setItem('hidden_blocks', arr);    
  }
  }

  function saveHiddenReload() {
    localStorage.setItem('hidden_blocks', arr);
  }


  /*** render hidden blocks on loading page*/

  window.addEventListener('load', renderHiddenBlocks);
  window.addEventListener('beforeunload', saveHiddenReload);

  function renderHiddenBlocks() {

    let arr1 = localStorage.getItem('hidden_blocks').split(',')

    arr1.forEach(function (e) { 
      document.querySelector(`.${e}`).classList.toggle('hidden');})

    options.forEach(o => {
        if (localStorage.getItem('hidden_blocks').split(',').includes(o.value)) {
          o.classList.toggle('selected');
        }
      
     })   
  }

  /*88888888*/

optionsBlock.forEach(x => x.addEventListener ('click', selectOptionBlock));
optionsBlock.forEach(x => x.addEventListener ('click', makeHiddenArray));


function selectOptionBlock(y) {

  y.target.classList.toggle('selected');
  document.querySelector(`.${y.target.value}`).classList.toggle('hidden');
}

/****save settings to local memory */

function setLocalStorageLanguage() {
      localStorage.setItem('language', state.languages);
  }
  
  window.addEventListener('beforeunload', setLocalStorageLanguage);
  
  function getLocalStorageLanguage() {
      if (localStorage.getItem('language')) {
          state.languages = localStorage.getItem('language');
      }
  
      else {state.languages = 'en'}
  }
  
  window.addEventListener('load', getLocalStorageLanguage)

  