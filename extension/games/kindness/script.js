function getInput() {
    let input = document.getElementById("userInput").value;
    alert(input);
}

document.querySelector(".button").addEventListener("click", () => getInput());