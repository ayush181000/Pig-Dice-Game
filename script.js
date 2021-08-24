"use strict";

//Selecting Elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

//Variables
let activePlayer, playing, currentScore, scores;

//Starting conditions
const init = function () {
  //Variable Init
  activePlayer = 0;
  playing = true;
  scores = [0, 0];
  currentScore = 0;

  //Content Init
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  //Classes Init
  diceEl.classList.add("hidden");
  player0El.classList.add("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player1El.classList.remove("player--active");
};

//Calling init to initialize everything
init();

//Function to switch player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Rolling Dice Functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. genertaing random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    // 3. check dice !==1 ? if true switch to next player
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switch to other player
      switchPlayer();
    }
  }
});

//Hold button functionality
btnHold.addEventListener("click", function () {
  if (playing) {
    //1. add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check score is => 100 ? finish : switch player
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else {
      //3. switch player
      switchPlayer();
    }
  }
});

//New button functionality
btnNew.addEventListener("click", init);
