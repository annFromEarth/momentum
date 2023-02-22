import state from './state.js';
import quotes_T from '../assets/json/quotes_text.js'

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const buttonChangeQuotes = document.querySelector('.change-quote')

let randomQuote

function getRandomQuote() { randomQuote = Math.floor(Math.random()*15+1)};
getRandomQuote();

function getQuotes() {
    getRandomQuote();           //returns random number less than total quotes qount

        if (localStorage.getItem('language') == 'ru') {
            quote.textContent = quotes_T[randomQuote].quoteText_ru
            author.textContent = quotes_T[randomQuote].quoteAuthor_ru
        }
    
        else {
            quote.textContent = quotes_T[randomQuote].quoteText_en
            author.textContent = quotes_T[randomQuote].quoteAuthor_en
        }
      }

    


// async function getQuotes() {  

//     const quotes = '../assets/json/quotes.json'; 
//     const res = await fetch(quotes);
//     const data = await res.json(); 

//     console.log(data);
  
//     getRandomQuote();           //returns random number less than total quotes qount

//     if (localStorage.getItem('language') == 'ru') {
//         quote.textContent = data.quotes[randomQuote].quoteText_ru
//         author.textContent = data.quotes[randomQuote].quoteAuthor_ru
//     }

//     else {
//         quote.textContent = data.quotes[randomQuote].quoteText_en
//         author.textContent = data.quotes[randomQuote].quoteAuthor_en
//     }
//   }


  getQuotes();

  buttonChangeQuotes.addEventListener('click', getQuotes);

  export function translateQuote() {

    if (state.languages == 'ru') {
                quote.textContent = quotes_T[randomQuote].quoteText_ru
                author.textContent = quotes_T[randomQuote].quoteAuthor_ru
            }
        
            if ( state.languages == 'en') {
                quote.textContent = quotes_T[randomQuote].quoteText_en
                author.textContent = quotes_T[randomQuote].quoteAuthor_en
            }

  }


  
//   export async function translateQuote() {  

//     const quotes = '../assets/json/quotes.json';

//     // const quotes = '/momentum/assets/json/quotes.json';
//     const res = await fetch(quotes);
//     const data = await res.json(); 
  
//     // getRandomQuote();

//     if (state.languages == 'ru') {
//         quote.textContent = data[randomQuote].quoteText_ru
//         author.textContent = data[randomQuote].quoteAuthor_ru
//     }

//     if ( state.languages == 'en') {
//         quote.textContent = data[randomQuote].quoteText_en
//         author.textContent = data[randomQuote].quoteAuthor_en
//     }

//   }
