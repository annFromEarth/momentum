const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const buttonChangeQuotes = document.querySelector('.change-quote')

let randomQuote

function getRandomQuote() { randomQuote = Math.floor(Math.random()*50+1)};
getRandomQuote();

async function getQuotes() {  

    const quotes = '../assets/json/quotes.json';
    const res = await fetch(quotes);
    const data = await res.json(); 

    getRandomQuote();

    quote.textContent = data[randomQuote].quoteText
    author.textContent = data[randomQuote].quoteAuthor

  }
  getQuotes();

  buttonChangeQuotes.addEventListener('click', getQuotes);