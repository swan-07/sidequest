document.addEventListener("DOMContentLoaded", () => {
    var form = document.getElementById('form');
      number = document.getElementById('number');
    var variable;
    form.onsubmit = function() {
      variable = number.value;
      updateFrequency();
    };
  
    function getFrequency() {
      chrome.storage.local.get(['frequency'], (result) => {
          const frequency = result.frequency || 5;
          frequencyDisplay.textContent = 'Frequency: ' + frequency + ' minutes';
  
      });
  }
  
  function saveFrequency(frequency) {
      chrome.storage.local.set({ frequency }, () => {
      });
  }
  
  function updateFrequency() {
    chrome.storage.local.get(['frequency'], (result) => {
        let frequency = result.frequency || 5;
        frequency = variable; 
        saveFrequency(frequency); 
    });
  }
  
    getFrequency()
  });