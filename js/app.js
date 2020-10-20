// Variables
const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');
let data = [];

function showLoadingSpinner() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
	loader.hidden = true;
	quoteContainer.hidden = false;
}

function newQuote() {
	showLoadingSpinner();
	// Pick random quote from data array
	const quote = data[Math.floor(Math.random() * data.length)];
	// If quote has no author, replace with 'Unknown'
	if (!quote.author) {
		authorText.textContent = 'Unknown';
	} else {
		authorText.textContent = quote.author;
	}
	// If quote is too long, reduce fontsize
	if (quote.text.length > 120) {
		quoteText.classList.add('long-quote');
	} else {
		quoteText.classList.remove('long-quote');
	}
	quoteText.textContent = quote.text;
	removeLoadingSpinner();
}

// Get Quotes From API
async function getQuotes() {
	showLoadingSpinner();
	const API_URL = 'https://type.fit/api/quotes';
	try {
		const response = await fetch(API_URL);
		data = await response.json();
		newQuote();
	} catch (error) {
		console.log('OOPSIE');
	}
}

function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
	window.open(twitterUrl, '_blank');
}

// Eventlisteners
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
