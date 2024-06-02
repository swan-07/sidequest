function getInput() {
    let input = document.getElementById("userInput").value;
    document.getElementById("text").innerHTML = input;
}

document.querySelector(".button").addEventListener("click", () => getInput());