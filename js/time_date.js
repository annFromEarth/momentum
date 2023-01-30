const time = document.querySelector('.time');
const date = document.querySelector('.date');

function showTime() {
    const dateData = new Date();
    const currentTime = dateData.toLocaleTimeString();
    time.textContent = currentTime;

    const options = {weekday: 'long', day: 'numeric', month: 'long'};
    const currentDate = dateData.toLocaleDateString('en-US', options)
    date.textContent = currentDate;
    setTimeout(showTime, 1000);
}

showTime();
