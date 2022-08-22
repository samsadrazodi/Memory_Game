const gameContainer = document.getElementById("game");
let card1 = null;  // card 1 set to null and then defined based on user selection
let card2 = null;  //card 1 set to null and then defined based on user selection
let cardSolved = 0; // to keep track of the number of solved cards to know when the game is over.
let count = 0 // Initiate count to keep track of the number of tries
let tries = 0; // To keep track of number of tries it took to complete game.
let p = document.querySelector('p'); // to be able to show on page the number of tries it took to complete game





const COLORS = [
  "red",
  "yellow",
  "MediumSpringGreen",
  "mediumslateblue",
  "plum",
  "red",
  "yellow",
  "MediumSpringGreen",
  "mediumslateblue",
  "plum"

];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);


    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);




    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }

}


// TODO: Implement this function!
function handleCardClick(event) {
  let currentCard = event.target;  //Defining current card that the user clicks on

  currentCard.style.backgroundColor = `${event.target.classList.value}`;  // Change the background color of the div to its named color

  //console.log(`current card color: ${currentCard.classList.value} `)

  if (card1 === null) {  // Checking to see if the card1 has already been assigned to a color
    card1 = currentCard;  //If card1 is still null, set current card as card 1.
    card1.classList.add('selected'); //add the class of 'selected' to be able to keep track of selected cards
    //console.log(`card 1 color: ${card1.classList.value}`)  

  } else {                        // if card1 was already full (not null), 
    if (currentCard === card1) {  // checking if the same card is clicked on twice
      alert('select another card!') //alerting the user to select another card
    } else {
      card2 = currentCard;  // (continued comment of line 90) --> set current card to card 2.
      card2.classList.add('selected');  // Add 'selected' class to the div of card2. to keep track the two selected cards.
      //console.log(`card2 color: ${card2.classList.value}`)
    }
  }

  // Initiate solvedCard1 and solvedCard2 to pass the two previously 
  // selected cards to them. This will help us to set back the card1 and 
  //card2 to null for future selections and still keep track of the ones
  // that are solved.
  let solvedCard1 = card1;
  let solvedCard2 = card2;
  // If statement below checks the divs for the selected cards and if they are different divs but same color values
  // they represent a match and are therefore solved. 
  if (solvedCard1 !== solvedCard2 && `${solvedCard1.classList.value}` === `${solvedCard2.classList.value}`) {
    cardSolved += 2; // cardSolved is incremented by 2 because a match is based on 2 cards.

    // removing the event listener on the matched divs so clicking on them 
    // wouldnt select them as currentCard again.
    card1.removeEventListener("click", handleCardClick);
    card2.removeEventListener("click", handleCardClick);

    // Setting the card1 and card2 back to null so they are available for future selctions.
    card1 = null;
    card2 = null;
    tries += 1; // Adding one to the number of tries
  } else {                 // The else statement is for when we don't have a match. 
    setTimeout(function () {  // Setting timeOut to turn the cards back to null and removing background color.
      card1.style.backgroundColor = "";  // Removing the background color 
      card2.style.backgroundColor = "";
      card1.classList.remove("selected"); // Removing the 'selected' class
      card2.classList.remove("selected");
      card1 = null;  //Setting the cards back to null for future selections
      card2 = null;
      tries += 1;
    }, 1000)

  }

  //  keep track of the number of solved cards
  // when the number of solved cards is equal to the number of cards
  // the game is finished 
  setTimeout(function () {

    if (cardSolved === COLORS.length) { // checking if solvedCards = number of the cards in game
      p.append(`Tries: ${tries}`); // Showing the number of tries it took to complete the game
      alert('Great Job!') //making an alert to notify that the game is done. Great Job (this is entirely optional)
    }
  })



};


// when the DOM loads
createDivsForColors(shuffledColors);

/* */
