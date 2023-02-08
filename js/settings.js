const btnSettings = document.querySelector('.settings_button')
const divSettings = document.querySelector('.settings')
const state = {
  languages: ['en', 'ru'],
  photoSource: ['github', 'unsplash', 'flickr'],        //GitHub, Unsplash API, Flickr API 
  blocks: ['time', 'date','greeting', 'quote', 'weather', 'audio', 'todolist']
}

btnSettings.addEventListener('click', showSettings);

function showSettings() {
    divSettings.classList.toggle('active')
}