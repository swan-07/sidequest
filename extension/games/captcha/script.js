setTimeout(() => {
    chrome.runtime.sendMessage({ type: "done" });
    const dialog = document.querySelector("dialog");
    const p = dialog.querySelector("p")

    p.textContent = "Nice job! You solved the captcha!";

    confetti({
        particleCount: 10e5,
        spread: 180,
        origin: { y: 0.8 },
    });
    
    dialog.showModal();

    const button = dialog.querySelector("button");
    button.addEventListener("click", function() {
        window.close();
    })
}, 1 * 60 * 1000);