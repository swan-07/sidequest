
document.addEventListener("DOMContentLoaded", async () => {
  try {
    await changeText();
  } catch (error) {
    console.error("Failed to initialize:", error);
  }
});



async function changeText() {
  randomQuest = await getRandomCodeforcesChallenge();
  let labelElement = document
      .getElementById("label");
  labelElement.innerHTML = randomQuest.problemUrl;
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

async function getRandomCodeforcesChallenge() {
  try {
      const response = await fetch('https://codeforces.com/api/problemset.problems');
      const data = await response.json();

      const problems = data.result.problems;

      // Select a random problem
      const randomIndex = Math.floor(Math.random() * problems.length);
      const randomProblem = problems[randomIndex];

      // Extract problem details
      const contestId = randomProblem.contestId;
      const index = randomProblem.index;
      const name = randomProblem.name;

      const problemUrl = `https://codeforces.com/problemset/problem/${contestId}/${index}`;


      return {
        problemUrl
    };
} catch (error) {
    console.error('Failed to fetch Codeforces challenges:', error);
    return 'Failed to fetch Codeforces challenges. Please try again later.';
}
}
