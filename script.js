const fs = require("fs");

const input = fs.readFileSync("text.txt", "utf-8");

const words = input.split("\n");

function changeText() {
    document.getElementById("text").innerHTML = "BECAUSE"
}