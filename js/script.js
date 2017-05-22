/*
Submitting for extra credit. In addition to what was required I did the following:
1. background color set to be sufficiently different from white (which is the font color)
2. fixed problem with leading comma if citation and/or year exist
3. ensured a quote cannot display twice in a row (after looping through all quotes)

Possible extensions:
a. change button color from green to background color
b. ensure background color is sufficiently different from any general font color (fixed to white in this case)
c. this program probably breaks if 0 or 1 quote present in array of quotes - need to handle this separately

Submitted by: Marko Kecman, 22 May 2017
*/

// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

//Set refresh interval
var intervalTime = 10000;
var intervalID = window.setInterval(printQuote, intervalTime);

//Global variables
var strQuoteHTML = '';
var arrNotViewedQuotes =[];
var strRandomColor;
var intRandomQuote;

//Array with quotes
var quotes = [
	{
		quote: "Hell hath no fury like a bureaucrat scorned.",
		source: "Milton Friedman",
		tags: "Society"
	},
	{
		quote: "I would rather be exposed to the inconveniencies attending too much liberty than those attending too small a degree of it.",
		source: "Thomas Jefferson",
		citation: "Letter to Archibald Stuart",
		year: 1791,
		tags: "Society"
	},
	{
		quote: "We now accept the fact that learning is a lifelong process of keeping abreast of change. And the most pressing task is to teach people how to learn.",
		source: "Peter Drucker",
		tags: "Knowledge"
	},
	{
		quote: "Many a man who falls in love with a dimple makes the mistake of marrying the whole girl.",
		source: "Evan Esar",
		citation: "Esar's Comic Dictionary",
		tags: "Humor"
	},
	{
		quote: "In the land of the blind, the one-eyed man is stoned to death.",
		source: "Joan D. Vinge",
		citation: "Catspaw",
		tags: "Society"
	},
	{
		quote: "It is forbidden to kill; therefore all murderers are punished unless they kill in large numbers and to the sound of trumpets.",
		source: "Voltaire",
		tags: "Humor"
	}
];

//Reset unviewed quotes to all quotes, if all quotes have been viewed
function funResetUnviewedQuotes() {
	if (arrNotViewedQuotes.length === 0) {
		for (i=0; i<quotes.length; i+=1) {
			arrNotViewedQuotes.push(i);
		}
	}
}

//Function: Generate random quote from list of unviewed quotes.
function getRandomQuote() {
	//Stop program from giving same quote twice in a row (i.e. after it has looped through all quotes)
	var intRandomQuoteOld = intRandomQuote;
	var intRandomQuoteNew;

	var intRandomQuoteID;
	do {
		intRandomQuoteID = Math.floor(Math.random() * arrNotViewedQuotes.length);
		intRandomQuoteNew = arrNotViewedQuotes[intRandomQuoteID];
	} while (intRandomQuoteNew === intRandomQuoteOld);
	//Above line checks if new and old quotes are the same, and if so, loops to generate a new qoute and checks again

	arrNotViewedQuotes.splice(intRandomQuoteID, 1);
	return intRandomQuoteNew;
}

// Function to generate quote HTML
function funGenerateHTML(orderInArray) {
	var returnHTML;
	// Populate with mandatory fields
	returnHTML ='<p class="quote">' + quotes[orderInArray].quote + '</p>';
	returnHTML += '<p class="source">' + quotes[orderInArray].source + '</p>';

	// Populate with optional fields
	if (quotes[orderInArray].citation ) {
		returnHTML += '<span class="citation">' + quotes[orderInArray].citation + '</span>';
	}

	if (quotes[orderInArray].year) {
		//Fixing issue with brackets before citation and before year if no citation (also changed css file)
		if (quotes[orderInArray].citation ) {
			returnHTML += '<span class="year">, ' + quotes[orderInArray].year + '</span></p>';
		}	else {
				returnHTML += '<span class="year">' + quotes[orderInArray].year + '</span></p>';
			}
	}

	if (quotes[orderInArray].tags ) {
		returnHTML += '<h3>' + quotes[intRandomQuote].tags + '</h3>';
	}

return returnHTML;
}

//Function: Generate random color
function funGetRandomColor() {
//Define threshold to keep color significantly darker than white font
var threshold = 150;
var red  = Math.floor(Math.random() * threshold );
var green  = Math.floor(Math.random() * threshold );
var blue  = Math.floor(Math.random() * threshold );

strRandomColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
}

//Function that runs everything
function printQuote(){
	clearInterval(intervalID);

	funGetRandomColor();
	document.getElementsByTagName("body")[0].style.backgroundColor = strRandomColor;

	funResetUnviewedQuotes();
	intRandomQuote = getRandomQuote();
	strQuoteHTML = funGenerateHTML(intRandomQuote);

	console.log(quotes[intRandomQuote].quote);

	var outputDiv = document.getElementById('quote-box');
	outputDiv.innerHTML = strQuoteHTML;
	intervalID = window.setInterval(printQuote, intervalTime);
}

printQuote();
