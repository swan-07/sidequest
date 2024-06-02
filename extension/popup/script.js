document.addEventListener("DOMContentLoaded", () => {
  const statPointsEl = document.querySelector(".stat-points");
  const statQuestsEl = document.querySelector(".stat-quests");
  const intervalEl = document.querySelector(".interval-input")

  getPoints().then(points => {
    statPointsEl.textContent = "You have " + Intl.NumberFormat().format(points) + (points == 1 ? " point" : " points") + " ⭐️"
  })

  getQuestCount().then(questCount => {
    statQuestsEl.textContent = "You've been interrupted " + Intl.NumberFormat().format(questCount) + (questCount == 1 ? " time" : " times") + " ⏰"
  })

  getInterval().then(interval => intervalEl.value = interval);
  intervalEl.addEventListener("change", () => {
    setInterval(intervalEl.value);
  })
})
