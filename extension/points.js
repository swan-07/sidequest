async function getPoints() {
  const result = await chrome.storage.local.get(["points"]);
  return result?.points || 0;
}

async function setPoints(points) {
  await chrome.storage.local.set({ points });
}

async function awardPoints(awardedPoints = 1) {
  await setPoints((await getPoints()) + awardedPoints)
}

async function getQuestCount() {
  const result = await chrome.storage.local.get(["questCount"]);
  return result?.questCount || 0;
}

async function registerQuest() {
  const result = await chrome.storage.local.get(["questCount"]);

  await chrome.storage.local.set({
    questCount: (result?.questCount || 0) + 1
  })
}

async function getAlarmInterval() {
  const result = await chrome.storage.local.get(["interval"]);
  return result?.interval || 5;
}

async function setAlarmInterval(interval) {
  await chrome.storage.local.set({ interval: parseInt(interval) });
}

async function getSkipsLeft() {
  const result = await chrome.storage.local.get(["skipsLeft"]);
  return result?.skipsLeft || 0;
}

async function setSkipsLeft(skipsLeft) {
  await chrome.storage.local.set({ skipsLeft });
}

async function buySkip() {
  const points = await getPoints();
  if (points >= 10) {
    await setPoints(points - 10);
    const skipsLeft = await getSkipsLeft();
    await setSkipsLeft(skipsLeft + 1);
    return true;
  } else {
    return false;
  }
}



async function getRandomState() {
  const result = await chrome.storage.local.get(["random"]);
  return result?.random || true;
}

async function setRandomState(random) {
  await chrome.storage.local.set({ random });
}
