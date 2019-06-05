/*
 * Create a list that holds all of your cards
 */
 /*------------Global Variables -----------------*/
 // #1 Storing deck cards in Array
let cardList = ["fa fa-diamond",
                "fa fa-diamond",
                "fa fa-paper-plane-o",
                "fa fa-paper-plane-o",
                "fa fa-anchor",
                "fa fa-anchor",
                "fa fa-bolt",
                "fa fa-bolt",
                "fa fa-cube",
                "fa fa-cube",
                "fa fa-leaf",
                "fa fa-leaf",
                "fa fa-bicycle",
                "fa fa-bicycle",
                "fa fa-bomb",
                "fa fa-bomb"];
// Fliped Cards temp list
let flippedCards = [];

//Matched Cards permanent till the end of Game
let matchedCards = [];

//Card container
const cardBox = document.querySelector(".deck");

// a variable to detect when the user first clicks a card. We use it to start the timer
let firstClick = false;

//variable to count the user number of moves
let moves = 0;
let movesCounter = document.querySelector(".moves");

// Container of star icons
const stars = document.querySelectorAll(".fa-star");

//Timer Vars
let seconds = 0, minutes = 0, hours = 0;
let timer = document.querySelector(".timer");
let interval;

// winGame Vars
let winGameAlert = document.getElementById("modalpop")

 //close win alert
 let closeWinAlert = document.querySelector(".close");
/*-----------------------------------------*/
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
// #2 Initializing game panel
function startGame(){
    // reset moves
    moves = 0;
    movesCounter.innerHTML = moves;
    // reset rating
    for (var i= 0; i < stars.length; i++){
        stars[i].style.visibility = "visible";
    }
    // reset timer if its running
    reseTimer();
    //Shuffle cards
    cardList = shuffle(cardList);
    //Adding cards to game board by loop
   for (let i = 0; i< cardList.length; i++ ){
      const card = document.createElement("li");
      card.classList.add("card");
      card.innerHTML= `<i class = "${cardList[i]}"></i>`;
      cardBox.appendChild(card);
      // #3 Create clicked cards
      flipCard(card);
    }
  }
/*-----------------------------------------*/
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
/*------------------------------------------*/
// #3 Create "click event" for cards
function flipCard(card){
  card.addEventListener('click', function(){
  // assign true to the firstClick variable to be able to start the timer
  !firstClick && (firstClick = true);
  startTimer(firstClick);
  // disables calling the startTimer every time a user clicks on a card
  firstClick = 1;
  //#4 Check if there is flipped cards
  //Card is flipped?
  if (flippedCards.length === 1){
    //Card flipped
    // disable clicking on cards
    card.classList.add("open","show","disable");
    //save flipped cards in newlist
    flippedCards.push(this);
    let secondCard = this;
    let firstCard = flippedCards[0];
    //#5 If flipped cards matched or not
    matchCard(firstCard,secondCard);
  }
  else{
      //Card not flipped
      // disable clicking on cards
      this.classList.add("open","show", "disable");
      //save opened cards in newlist
      flippedCards.push(this);
    }
  });
}
/*-----------------------------------------*/
//Count player moves and set the counter with result
function countMoves(){
  //add move
  moves++;
  movesCounter.innerHTML = moves;
  // Rating based on  # of moves
  if (moves > 8 && moves < 12){
      for( i= 0; i < 3; i++){
          if(i > 1){
              stars[i].style.visibility = "collapse";
          }
      }
  }
  else if (moves > 13){
      for( i= 0; i < 3; i++){
          if(i > 0){
              stars[i].style.visibility = "collapse";
          }
      }
  }
}
/*----------------------------------------------*/
//Function to check if cards matched
function matchCard(firstCard,secondCard){
  var x = document.getElementById("matchAudio");
  var y = document.getElementById("unmatchAudio");
  //#5 If flipped cards matched or not
  if (secondCard.innerHTML === firstCard.innerHTML){
      x.play();
      //if cards matched set cards class to match
      secondCard.classList.add("match");
      firstCard.classList.add("match");
      //#6 Store matched cards in permanent card list
       matchedCards.push(firstCard, secondCard);
      //#9 Check if all cards matched end Game
      winGame(firstCard, secondCard);
    }

    else{
        //set delay time for cards if not matched before flipped
          //if Cards not Matched
          y.play();
          secondCard.classList.add("unmatched");
          firstCard.classList.add("unmatched");
          // remove class open and show from cards
          setTimeout(function(){
            secondCard.classList.remove("open","show","disable","unmatched");
            firstCard.classList.remove("open","show","disable","unmatched");
          }, 1000);
        }
      //Add moves
      countMoves();
      //clear flippedCards Array
      flippedCards = [];
  }
/*--------------------------------------*/
//Displayed Timer
function startTimer(on){
  if (on === true) {
    interval = setInterval(function(){
        seconds++;
        if(seconds == 60){
            minutes++;
            seconds = 0;
        }
        if(minutes == 60){
            hours++;
            minutes = 0;
            seconds = 0;
        }
        timer.innerHTML = hours+":"+minutes+":"+seconds;
    },1000);
}
}
/*----------------------------------------*/
// stops the timer
function stopTimer() {
  clearInterval(interval);
}
/*----------------------------------------*/
// stops the timer and resets all variables used in it
function reseTimer() {
  stopTimer();
  hours = 0;
  minutes = 0;
  seconds = 0;
  timer.innerHTML = hours+":"+minutes+":"+seconds;
  firstClick = false;
}
/*---------------------------------------------*/
// stops the timer and resets all variables used in it
function reseTimer() {
  stopTimer();
  hours = 0;
  minutes = 0;
  seconds = 0;
  timer.innerHTML = hours+":"+minutes+":"+seconds;
  firstClick = false;
}
/*------------------------------------------*/
//#7 End of game
function winGame(firstCard,secondCard){
   var x = document.getElementById("winAudio");
    if(matchedCards.length === cardList.length){
        finalTime = timer.innerHTML;
        stopTimer();
         x.play();
        setTimeout(function(){
          secondCard.classList.add("matched");
          firstCard.classList.add("matched");
        }, 1000);
      //Display Congratulations Alert
       winGameAlert.classList.add("show");
      //get last rating value
      var starRating = document.querySelector(".stars").innerHTML;
      //showing move, rating, time on winAlert
      document.getElementById("finalMove").innerHTML = moves +1;
      document.getElementById("starRating").innerHTML = starRating;
      document.getElementById("totalTime").innerHTML = finalTime;
       //close Alert
       closeAlert();
      };
}
/*-----------------------------------*/
//
function closeAlert(){
    closeWinAlert.addEventListener("click", function(){
        winGameAlert.remove("show");
        resetGame()
    });
}


//
function playAgain(){
    winGameAlert.classList.remove("show");
    resetGame()
}
/*----------Restart Game Btn--------*/
const resetBtn = document.querySelector(".restart");
resetBtn.addEventListener("click", function() {
    resetGame()
});
/*-----------Reset Game------------------*/
function resetGame(){
  //remove panel cards
  cardBox.innerHTML = "";
  //empty matched cards arry
  matchedCards = [];
    stopTimer();
  //start new game
    startGame();
}
/*--------------------------------------*/
//#2 Game Initialization
document.body.onload = function() {
    startGame();
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
