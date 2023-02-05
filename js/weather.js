const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const wind =  document.querySelector('.wind');
const humidity = document.querySelector('.humidity')
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error')
// city.value = localStorage.getItem('city');/*??????*/

function getLocalStorageCity() {
  if (localStorage.getItem('city')) {
      city.value = localStorage.getItem('city');
  }

  else {city.value = 'Minsk'}
}

getLocalStorageCity()

window.addEventListener('load', getLocalStorageCity)

async function getWeather() {  

  try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=e26d96f764d42f134652ada99c35abb8&units=metric`;
      const res = await fetch(url);
      const data = await res.json(); 

      weatherError.textContent = "";

      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      wind.textContent = `${Math.round(data.wind.speed)} m/s`;
      humidity.textContent = `${Math.round(data.main.humidity)} %`;

      console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
  }
    catch {

      weatherError.textContent = "City not found. Please try again."

      weatherIcon.className = ``;
      temperature.textContent = ``;
      weatherDescription.textContent = ``;
      wind.textContent = ``;
      humidity.textContent = ``;

    }
  }

getWeather()


city.addEventListener('change', getWeather);


