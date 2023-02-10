const btnSettings = document.querySelector('.settings_button')
const divSettings = document.querySelector('.settings')
const options = document.querySelectorAll('.option')

const optionsLanguage = document.querySelectorAll('.option.language')
const optionsBlock = document.querySelectorAll('.option.block')
const optionsSrc = document.querySelectorAll('.option.src')

/*show settings menu*/

btnSettings.addEventListener('click', showSettings);

function showSettings() {
    divSettings.classList.toggle('active')
}

/***********************outside click close***********************/

document.addEventListener('click', (e) => {
  const withinBoundaries = e.composedPath().includes(divSettings);
  const withinSettingsButton = e.composedPath().includes(btnSettings);
  console.log('a')

  if (!withinBoundaries && !withinSettingsButton && divSettings.classList.contains('active')) {
    // document.body.classList.toggle('_lock');
    divSettings.classList.remove('active');
    console.log('b')
  }
})

/*choose language*/

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

/*choose background source*/

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

/*hide blocks*/

optionsBlock.forEach(x => x.addEventListener ('click', selectOptionBlock));

function selectOptionBlock(y) {

  y.target.classList.toggle('selected');
  document.querySelector(`.${y.target.value}`).classList.toggle('hidden');
}
