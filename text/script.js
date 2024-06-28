const mini_quests = [
    "Text an old friend",
    "Email an old friend",
    "Call a friend",
    "Text a friend",
    "Email a friend",
    "Text a friend you haven't seen in a while",
    "Email a friend you haven't seen in a while",
    "Text a stranger",
    "Email a stranger",
    "Compliment someone",
    "Show someone your appreciation for them",
    "Eat a fruit",
    "Eat a fruit",
    "Eat a vegetable",
    "Eat a vegetable",
    "Eat a snack",
    "Drink water",
    "Drink water",
    "Drink water",
    "Meditate for 5 minutes",
    "Block yourself out for 5 minutes",
    "Do 5 push-ups",
    "Do a 30-sec plank",
    "Do 5 squats",
    "Do 5 lunges",
    "Do 30 sit-ups",
    "Do a 30-sec side plank",
    "Do 20 chair dips",
    "Do 20 straight leg lifts",
    "Do 20 toe touches",
    "Breathe some fresh air",
    "Do 10 push-ups",
    "Do 5 diamond push-ups",
    "Do a clap push-up",
    "Do 5 wide push-ups",
    "Do 10 tricep dips",
    "Do 10 burpees",
    "Do 10 mountain climbers",
    "Do 10 side lunges",
    "Do 10 Russian twists",
    "Do 10 leg raises",
    "Do a 30-sec wall sit",
    "Do 10 tuck jumps"
]

  
  document.addEventListener("DOMContentLoaded", () => {
    changeText();
  });
  
  
function changeText() {
    randomQuest = mini_quests[Math.floor(Math.random() * mini_quests.length)];
    let labelElement = document
        .getElementById("label");
    labelElement.innerHTML = randomQuest;
}

const button1 = document.getElementById("button1");
button1.addEventListener("click", function() {
  changeText();
})

const button2 = document.getElementById("button2");
button2.addEventListener("click", async function() {
  await chrome.runtime.sendMessage({ type: "done" });
  window.close();
})