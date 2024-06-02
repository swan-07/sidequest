let loadTime;

function setTime() {
    loadTime = Date.now();
    console.log(loadTime);
}
function click() {
    alert("clicked");
    let clickTime = Date.now();
    console.log(clickTime);
    let diff = clickTime - loadTime;
    console.log("test");
    if (diff > 300000) { //5 min in ms
        close();
    }
    else {
        alert("Get back outside! You're not done!");
    }
}

document.querySelector(".finished").addEventListener("click", () => click());