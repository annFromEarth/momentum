import state from './state.js';

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const buttonChangeQuotes = document.querySelector('.change-quote')

let randomQuote

function getRandomQuote() { randomQuote = Math.floor(Math.random()*15+1)};
getRandomQuote();
let lang = 'en';

async function getQuotes() {  

    const quotes = '../assets/json/quotes.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
  
    getRandomQuote();

    if (state.languages == 'en') {
        quote.textContent = data[randomQuote].quoteText_en
        author.textContent = data[randomQuote].quoteAuthor_en
    }

    if (state.languages == 'ru') {
        quote.textContent = data[randomQuote].quoteText_ru
        author.textContent = data[randomQuote].quoteAuthor_ru
    }

    // quote.textContent = data[randomQuote].quoteText_en
    // author.textContent = data[randomQuote].quoteAuthor_en

  }
  getQuotes();

  buttonChangeQuotes.addEventListener('click', getQuotes);