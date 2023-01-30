const time = document.querySelector('.time')

const date = new Date();
const currentTime = date.toLocaleTimeString()

function showTime() {
time.textContent = currentTime;
setTimeout(showTime, 10000);
}
showTime();

console.log(time)
console.log(date)
console.log(currentTime)