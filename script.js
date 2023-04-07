let currentWord = "because";
let lines = []
let guessNum = 1
let currentGuess = []


fetch('text.txt')
  .then(response => response.text())
  .then(text => {
    lines = text.split('\n');
  });

function changeText() {
    currentWord = lines[getRandomNumber()];
    for (let i = 1; i <= 7; i++) {
        document.getElementById(`l${i}${guessNum}`).textContent = currentWord[i-1];
    }
    guessNum++;
}

function clearText() {
    for (let i = 1; i <= 7; i++) {
        for (let j = 1; j <= 7; j++) {
            document.getElementById(`l${i}${j}`).textContent = '';
        }
    }
    guessNum = 1;
}

function updateBoard() {
    for (let i = 1; i <= currentGuess.length; i++) {
        document.getElementById(`l${i}${guessNum}`).textContent = currentGuess[i-1];
    }

    for (let j = currentGuess.length+1; j <= 7; j++) {
        document.getElementById(`l${j}${guessNum}`).textContent = '';
    }
}

function keyPress(key) {
    if (currentGuess.length < 7) {
        currentGuess.push(key);
        updateBoard();
    }
}

function keyDelete() {
    if (currentGuess.length > 0) {
        currentGuess.pop();
        updateBoard();
    }
}

function keySubmit() {
    if (currentGuess.length == 7) {
        guessNum += 1;
        currentGuess = [];
    }
}

function getRandomNumber() {
    return Math.floor(Math.random() * lines.length);
}