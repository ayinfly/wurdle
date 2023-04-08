let currentWord = "because";
let lines = []
let guessNum = 1
let currentGuess = ""
let correctWord = "because"

fetch('text.txt')
  .then(response => response.text())
  .then(text => {
    lines = text.split('\n');
  });

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if ("qwertyuiopasdfghjklzxcvbnm".includes(key)) {
        keyPress(key);
    } else if (key == "Enter") {
        keySubmit();
    } else if (key == "Backspace") {
        keyDelete();
    }
});

function updateBoard() {
    for (let i = 1; i <= currentGuess.length; i++) {
        document.getElementById(`l${i}${guessNum}`).textContent = currentGuess[i-1];
        document.getElementById(`l${i}${guessNum}`).style.border = "1px solid silver";
    }

    for (let j = currentGuess.length+1; j <= 7; j++) {
        document.getElementById(`l${j}${guessNum}`).textContent = '';
        document.getElementById(`l${j}${guessNum}`).style.border = "1px solid gray";
    }
}

function keyPress(key) {
    if (currentGuess.length < 7) {
        currentGuess += key;
        updateBoard();
    }
}

function keyDelete() {
    if (currentGuess.length > 0) {
        currentGuess = currentGuess.slice(0, currentGuess.length-1);
        updateBoard();
    }
}

function keySubmit() {
    if (currentGuess.length == 7) {
        if (lines.includes(currentGuess)) {
            wordCheck(currentGuess);
            guessNum += 1;
            currentGuess = "";
        } else {
            window.alert("invalid word");
        }
    }
}

function wordCheck(word) {
    for (let i = 0; i < 7; i++) {
        let box = document.getElementById(`l${i+1}${guessNum}`)

        if (word[i] == correctWord[i]) {
            box.style.backgroundColor = "#023020";
        } else if (correctWord.includes(word[i])) {
            box.style.backgroundColor = "#8B8000";
        } else {
            box.style.backgroundColor = "#000000";
        }
        box.style.transform = "rotateX(360deg)";
    }
}

function getRandomNumber() {
    return Math.floor(Math.random() * lines.length);
}