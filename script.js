let currentWord = "because";
let lines = []
let guessNum = 1
let currentGuess = ""
let correctWord = "because"
let wordList = []
let dailyWord = ""

const ALPHABET = "abcdefghijklmnopqrstuvwxyz"
const now = new Date();
const currentYear = now.getFullYear();
const currentDay = now.getDay();

fetch('text.txt')
  .then(response => response.text())
  .then(text => {
    lines = text.split('\n');
    wordList = lines.map(word => word.toLowerCase());
    setDailyWord();
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

function setDailyWord() {
    dailyWord = wordList[currentYear*currentDay%(wordList.length-1)];
    correctWord = dailyWord
}

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
    if (currentGuess.length == 7 && wordList.includes(currentGuess)) {
        wordCheck(currentGuess);
        guessNum += 1;
        currentGuess = "";
    } else {
        for (let i = 0; i < 7; i++) {
            let box = document.getElementById(`l${i+1}${guessNum}`)
            box.style.animation = "none";
            void box.offsetWidth;
            box.style.animation = "horizontal-shaking 0.3s";

        }
    }
}

function wordCheck(word) {
    let hash = Array(26).fill(0);

    for (let i = 0; i < 7; i++) {
        hash[ALPHABET.indexOf(correctWord[i])] += 1;
    }

    console.log(hash);

    for (let i = 0; i < 7; i++) {
        let box = document.getElementById(`l${i+1}${guessNum}`)
        if (word[i] == correctWord[i]) {
            box.style.backgroundColor = "#023020";
            box.style.border = "1px solid #023020"
            hash[ALPHABET.indexOf(word[i])] -= 1;

        } else if (correctWord.includes(word[i]) && hash[ALPHABET.indexOf(word[i])] > 0) {
            box.style.backgroundColor = "#8B8000";
            box.style.border = "1px solid #8B8000"
            hash[ALPHABET.indexOf(word[i])] -= 1;
        } else {
            box.style.backgroundColor = "#303030";
            box.style.border = "1px solid #303030"
        }
        box.style.transform = "rotateX(360deg)";

    }
    if (word == correctWord) {
        winner();
    }
}

function winner(i) {
    for (let i = 0; i < 7; i++) {
        let box = document.getElementById(`l${i+1}${guessNum}`)
        box.style.animation = "wave 0.7s";

    }
    guessNum = 7;

}

function getRandomNumber() {
    return Math.floor(Math.random() * wordList.length);
}