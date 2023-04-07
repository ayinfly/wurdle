let currentWord = "because";
let lines = []
let guessNum = 1


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

function getRandomNumber() {
    return Math.floor(Math.random() * lines.length);
}
