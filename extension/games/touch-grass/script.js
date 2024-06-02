let loadTime = Date.now();

function click() {
    let clickTime = Date.now();
    let diff = clickTime - loadTime;
    if (diff > 60000) { //1 min to ms is 60000
        (async () => {
            await chrome.runtime.sendMessage({ type: "done" });
            window.close();
        })();
    }
    else {
        alert("Get back outside! You're not done!");
    }
}

document.querySelector(".finished").addEventListener("click", () => click());