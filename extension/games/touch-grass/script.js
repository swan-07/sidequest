let loadTime = Date.now();

function click() {
    let clickTime = Date.now();
    let diff = clickTime - loadTime;
    if (diff > 5 * 60 * 1000) { //5 min in ms is 300000
        close();
    }
    else {
        alert("Get back outside! You're not done!");
    }
}

document.querySelector(".finished").addEventListener("click", () => click());