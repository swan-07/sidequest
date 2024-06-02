let loadTime;

function setTime() {
    loadTime = Date.now();
    console.log(loadTime);
}
function click() {
    let clickTime = Date.now();
    let diff = clickTime - loadTime;
    console.log("test");
    if (diff > 300000) { //5 min in ms
        close();
    }
    else {
        alert("Get back outside! You're not done!");
    }
}