let mysteryNumber;
let maxTries;
let remainingTries;
let maxNumber;

const input = document.getElementById('userInput');
const message = document.getElementById('message');
const attempts = document.getElementById('attempts');
const submitBtn = document.getElementById('submitBtn');
const restartBtn = document.getElementById('restartBtn');
const difficulty = document.getElementById('difficulty');

function setDifficulty(level) {
  if (level === 'easy') {
    maxNumber = 10;
    maxTries = 3;
  } else if (level === 'medium') {
    maxNumber = 50;
    maxTries = 2;
  } else {
    maxNumber = 100;
    maxTries = 1;
  }
  remainingTries = maxTries;
  mysteryNumber = Math.floor(Math.random() * maxNumber) + 1;
  message.textContent = '';
  message.classList.remove('show');
  input.value = '';
  attempts.textContent = `Nombre d'essais restants : ${remainingTries}`;
  submitBtn.disabled = false;
  restartBtn.style.display = 'none';
}

function checkGuess() {
  const guess = Number(input.value);
  if (!guess || guess < 1 || guess > maxNumber) {
    showMessage(`Veuillez entrer un nombre entre 1 et ${maxNumber}`, 'red');
    return;
  }

  remainingTries--;

  if (guess === mysteryNumber) {
    showMessage(`Bravo ! Vous avez deviné le nombre ${mysteryNumber} 🎉`, 'green');
    endGame();
  } else if (remainingTries > 0) {
    const hint = guess > mysteryNumber ? 'C’est moins 🔽' : 'C’est plus 🔼';
    showMessage(`${hint}. Il vous reste ${remainingTries} essai(s).`, 'orange');
  } else {
    showMessage(`Dommage ! Le nombre était ${mysteryNumber} 😢`, 'red');
    endGame();
  }

  attempts.textContent = `Nombre d'essais restants : ${remainingTries}`;
}

function showMessage(text, color) {
  message.textContent = text;
  message.style.color = color;
  message.classList.add('show');
  setTimeout(() => {
    message.classList.remove('show');
  }, 1500);
}

function endGame() {
  submitBtn.disabled = true;
  restartBtn.style.display = 'inline-block';
}

submitBtn.addEventListener('click', checkGuess);
restartBtn.addEventListener('click', () => setDifficulty(difficulty.value));
difficulty.addEventListener('change', () => setDifficulty(difficulty.value));

// Initialisation du jeu
setDifficulty('easy');
