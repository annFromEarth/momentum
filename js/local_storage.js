function setLocalStorage() {
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);
}

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorageName() {
    if (localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }

    else {name.placeholder = 'Your Name'}
}

window.addEventListener('load', getLocalStorageName)

