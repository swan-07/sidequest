function hasInput() {
    let input = document.getElementById("userInput").value;
    document.getElementById("text").innerHTML = input;
    document.querySelector("svg").style.display = "block";
    document.querySelector("button").style.display = "none";
    document.querySelector("input").style.display = "none";
    (async () => {
        await chrome.runtime.sendMessage({ type: "done" });
    })();
}

document.querySelector(".button").addEventListener("click", () => hasInput());
