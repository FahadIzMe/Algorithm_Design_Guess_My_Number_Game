"use strict";

// Existing elements and variables
const range = document.querySelector(".number-range");
const numberInput = document.querySelector(".number-input");
const elementsBlock = document.querySelector(".entered-numbers");
const numbersList = document.querySelector(".numbers-list");
const message = document.querySelector(".message");
const scoreText = document.querySelector(".score");
const hiddenNumber = document.querySelector(".hidden-number");
const mainContainer = document.querySelector(".main-container");
const rightSection = document.querySelector(".right");
const leftSection = document.querySelector(".left");
const bodyElement = document.body;
const restartBtn = document.querySelector(".again");
const checkBtn = document.querySelector(".submit-number");

// Colors
const redColor = "rgb(197, 3, 3)";
const yellowColor = "rgb(224, 224, 4)";
const greenColor = "rgb(36, 94, 22)";

// Game Variables
let secretNumber;
let score = 10;

// Function to generate a random odd number
function getRandomOddNumber(max) {
  let num;
  do {
    num = Math.floor(Math.random() * max) + 1;
  } while (num % 2 === 0);
  return num;
}

// Function to generate unique numbers for the matrix based on the mode
function generateMatrix(mode) {
  const uniqueNumbers = new Set();
  const maxAttempts = 10000; // To prevent an infinite loop in edge cases

  while (uniqueNumbers.size < 100 && maxAttempts > 0) {
    let num;
    if (mode === "moderate") {
      num = Math.floor(Math.random() * 500) + 1;
    } else if (mode === "hard") {
      num = getRandomOddNumber(1000);
    } else {
      num = Math.floor(Math.random() * 100) + 1;
    }
    uniqueNumbers.add(num);
  }

  return Array.from(uniqueNumbers);
}

// Function to sort the matrix
function sortMatrix(matrix) {
  matrix.sort((a, b) => a - b);
}

// Function to convert sorted 1D array to 2D matrix
function convertToMatrix(oneDArray) {
  const matrix = [];
  let size = 0;
  for (let i = 0; i < 10; i++) {
    matrix[i] = [];
    for (let j = 0; j < 10; j++) {
      matrix[i][j] = oneDArray[size++];
    }
  }
  return matrix;
}

// Function to set the game mode and secret number
function checkMode() {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");
  const oneDArray = generateMatrix(mode);

  sortMatrix(oneDArray);
  const matrix = convertToMatrix(oneDArray);
  printMatrix(matrix);

  if (mode === "moderate") {
    range.innerText = "(Between 1 and 500)";
  } else if (mode === "hard") {
    range.innerText = "(An ODD Number Between 1 and 1000)";
  } else {
    range.innerText = "(Between 1 and 100)";
  }

  // Choose a random number from the matrix for the user to guess
  const randomRow = Math.floor(Math.random() * 10);
  const randomCol = Math.floor(Math.random() * 10);
  secretNumber = matrix[randomRow][randomCol];
  console.log(secretNumber); // For debugging purposes

  return matrix;
}


function printMatrix(matrix) {
  console.log("Matrix:");
  for (let i = 0; i < 10; i++) {
    console.log(matrix[i].map(value => String(value).padStart(5, ' ')).join(' '));
  }
}




// Function to initialize the game
function initializeGame() {
  const matrix = checkMode();
  numberInput.focus();
  score = 10;
  scoreText.textContent = score;
  displayMessage("Start playing...");
  hiddenNumber.textContent = "?";
  leftSection.style.display = "";
  elementsBlock.style.display = "";
  rightSection.classList.remove("win-message");
  mainContainer.classList.remove("winner");
  bodyElement.style.backgroundColor = "#222";
  changeColor("white");
  numbersList.innerHTML = ""; // Clear the list of entered numbers
}

// Function to display messages
function displayMessage(messageText) {
  message.textContent = messageText;
}

// Function to change message color
function changeColor(newColor) {
  message.style.color = newColor;
}

// Function to announce the winner
function winnerAnnouncement() {
  displayMessage("You win! Great Job!");
  changeColor(yellowColor);
  bodyElement.style.backgroundColor = greenColor;
  hiddenNumber.textContent = secretNumber;
  leftSection.style.display = "none";
  elementsBlock.style.display = "none";
  rightSection.classList.add("win-message");
  mainContainer.classList.add("winner");
}

// Function to handle guesses
function handleGuess() {
  const enteredNumber = numberInput.value;
  if (enteredNumber === "") {
    displayMessage("Please write a number...");
    changeColor(redColor);
    return;
  }

  const guess = parseInt(enteredNumber);
  addEnteredNumber(guess);

  if (guess === secretNumber) {
    winnerAnnouncement();
  } else {
    if (score > 1) {
      displayMessage(guess > secretNumber ? `${guess} Too high...` : `${guess} Too low...`);
      numberInput.value = "";
      changeColor(yellowColor);
      score--;
      scoreText.textContent = score;
    } else {
      scoreText.textContent = 0;
      displayMessage(`You lost! The number was ${secretNumber}. Please restart...`);
      changeColor(redColor);
    }
  }
}

// Function to add entered number to the list
function addEnteredNumber(number) {
  const li = document.createElement("li");
  li.textContent = `${number} `;
  numbersList.appendChild(li);
}

// Event Listeners
document.addEventListener("DOMContentLoaded", initializeGame);
numberInput.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    checkBtn.click();
  }
});
checkBtn.addEventListener("click", handleGuess);
restartBtn.addEventListener("click", initializeGame);
