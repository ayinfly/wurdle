let currentWord = "because";
let lines = []
let guess = 1


fetch('text.txt')
  .then(response => response.text())
  .then(text => {
    lines = text.split('\n');
  });

function changeText() {
    currentWord = "testing";
    document.getElementById("text").textContent = lines[getRandomNumber()];
}

function getRandomNumber() {
    return Math.floor(Math.random() * lines.length);
}