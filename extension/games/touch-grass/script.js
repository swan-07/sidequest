let loadTime;

function setTime() {
    loadTime = Date.now();
    console.log(loadTime);
}
function click() {
    let clickTime = Date.now();
    let diff = clickTime - loadTime;
    if (diff > 300000) { //5 min in ms is 300000
        close();
    }
    else {
        alert("Get back outside! You're not done!");
    }
}

document.querySelector(".finished").addEventListener("click", () => click());