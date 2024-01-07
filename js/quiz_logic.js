const flagImage = document.getElementById('flag-image');
const userGuessInput = document.getElementById('user-guess');
const submitButton = document.getElementById('submit-button');
const resultMessage = document.getElementById('result-message');
const correctMessage = document.getElementById('correct-message');
const scoreDisplay = document.getElementById('score');
const nextButton = document.getElementById('next-button');

let score = 0;
let currentCountry = '';

async function fetchRandomFlag() {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const countries = await response.json();
  const randomCountry = countries[Math.floor(Math.random() * countries.length)];
  currentCountry = randomCountry.name.common;
  flagImage.src = randomCountry.flags.png;
}

function checkGuess() {
  const userGuess = userGuessInput.value.trim();
  if (userGuess.toLowerCase() === currentCountry.toLowerCase()) {
    score++;
    resultMessage.textContent = 'Correct!';
    resultMessage.style.color = 'green';
  } else {
    resultMessage.textContent = 'Wrong. Try again!';
    // correctMessage.style.display = 'block';
    correctMessage.textContent = `its ${currentCountry}`;
    resultMessage.style.color = 'red';  
  }
  scoreDisplay.textContent = `Score: ${score}`;
  nextButton.style.display = 'block';
  submitButton.disabled = true;
}

function nextQuestion() {
  correctMessage.textContent = '';
  resultMessage.textContent = '';
  userGuessInput.value = '';
  nextButton.style.display = 'none';
  submitButton.disabled = false;
  fetchRandomFlag();
}

submitButton.addEventListener('click', checkGuess);
nextButton.addEventListener('click', nextQuestion);

// Initial flag fetch on page load
fetchRandomFlag();
