document.addEventListener("DOMContentLoaded", () => {
  var form = document.getElementById('form');
  var number = document.getElementById('number');
  var frequencyDisplay = document.getElementById('frequencyDisplay');
  var variable = 5;

  console.log("a");
  console.log(variable);

  form.onsubmit = function(event) {
      event.preventDefault();
      variable = number.value;
      console.log("a");
      console.log(variable);
      updateFrequency();
      return false; // Prevents default form submission
  };

  function getFrequency() {
      chrome.storage.local.get(['frequency'], (result) => {
          const frequency = result.frequency || 5;
          frequencyDisplay.textContent = 'Frequency: ' + frequency + ' minutes';
      });
  }

  function saveFrequency(frequency) {
      chrome.storage.local.set({ 'frequency': frequency }, () => {
          frequencyDisplay.textContent = 'Frequency: ' + frequency + ' minutes';
      });
  }

  function updateFrequency() {
      chrome.storage.local.get(['frequency'], (result) => {
          let frequency = result.frequency || 5;
          frequency = variable;
          saveFrequency(frequency);
      });
  }

  getFrequency();
});
