import state from './state.js';

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const wind =  document.querySelector('.wind');
const humidity = document.querySelector('.humidity')
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error')
// city.value = localStorage.getItem('city');/*??????*/


let lang;

export function getLang() {
  if (!localStorage.language) {
    lang= 'en';}
  else {
    lang = localStorage.language;
  }
}
getLang();


export function getLocalStorageCity() {
  if (localStorage.getItem('city') =='Minsk' || localStorage.getItem('city') =='Минск') {
    if (localStorage.language == 'ru') {
      city.value = 'Минск';
      setLocalStorageCity()
      console.log('gggg')
    }

    else {
      city.value = 'Minsk';
      setLocalStorageCity()
      console.log('aaa')
    }
  }

  if (localStorage.getItem('city')) {
      city.value = localStorage.getItem('city');
  }
  else {
    
    if (localStorage.language == 'ru') {
      city.value = 'Минск';
    }

    else {
      city.value = 'Minsk';
    }
 }
}

getLocalStorageCity()

window.addEventListener('load', getLocalStorageCity)

window.addEventListener('beforeunload', setLocalStorageCity);

export function setLocalStorageCity() {
 localStorage.setItem('city', city.value);
}

function setLocalCityonError() {
  if (localStorage.language == 'ru') {
    localStorage.setItem('city', 'Минск');
  }

  else {
    localStorage.setItem('city', 'Minsk');
  }
}



/*get Weather onload***************/

async function getWeatherOnload() {  

  try {

    let cityFromStorage = localStorage.getItem('city');
    
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityFromStorage}&lang=${lang}&appid=e26d96f764d42f134652ada99c35abb8&units=metric`;
      const res = await fetch(url);
      const data = await res.json(); 

      weatherError.textContent = "";

      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      humidity.textContent = `${Math.round(data.main.humidity)} %`;

      if (state.languages == 'ru') {
        wind.textContent = `${Math.round(data.wind.speed)} м/с`;
      }

      else {
        wind.textContent = `${Math.round(data.wind.speed)} m/s`;
      }
  }
    catch {

      if (state.languages == 'ru' && city.value) {
        weatherError.textContent = "Город не найден. Попробуйте ещё раз.";
     
      }
      else {
        weatherError.textContent = "City not found. Please try again.";
      
      }

      setLocalCityonError()

      weatherIcon.className = ``;
      temperature.textContent = ``;
      weatherDescription.textContent = ``;
      wind.textContent = ``;
      humidity.textContent = ``;
    }
  }

getWeatherOnload()


/*get weather*****/

export async function getWeather() {  

  try {


      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=e26d96f764d42f134652ada99c35abb8&units=metric`;
      const res = await fetch(url);
      const data = await res.json(); 

      weatherError.textContent = "";

      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      humidity.textContent = `${Math.round(data.main.humidity)} %`;

      if (state.languages == 'ru') {
        wind.textContent = `${Math.round(data.wind.speed)} м/с`;
      }

      else {
        wind.textContent = `${Math.round(data.wind.speed)} m/s`;
      }
  }
    catch {

      if (state.languages == 'ru' && city.value) {
        weatherError.textContent = "Город не найден. Попробуйте ещё раз.";
        city.value = 'Минск';
      }
      else {
        weatherError.textContent = "City not found. Please try again.";
        city.value = 'Minsk';
      }

      setLocalCityonError()

      weatherIcon.className = ``;
      temperature.textContent = ``;
      weatherDescription.textContent = ``;
      wind.textContent = ``;
      humidity.textContent = ``;
    }
  }


city.addEventListener('change', getWeather);

export async function translateWeather() {  

  try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${state.languages}&appid=e26d96f764d42f134652ada99c35abb8&units=metric`;
      const res = await fetch(url);
      const data = await res.json(); 

      weatherError.textContent = "";

      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      humidity.textContent = `${Math.round(data.main.humidity)} %`;

      if (state.languages == 'ru') {
        wind.textContent = `${Math.round(data.wind.speed)} м/с`;
      }

      else {
        wind.textContent = `${Math.round(data.wind.speed)} m/s`;
      }
  }
    catch {

      if (state.languages == 'ru') {
        weatherError.textContent = "Город не найден. Попробуйте ещё раз.";
      }
      else {
        weatherError.textContent = "City not found. Please try again.";
      }

      weatherIcon.className = ``;
      temperature.textContent = ``;
      weatherDescription.textContent = ``;
      wind.textContent = ``;
      humidity.textContent = ``;
    }
  }





