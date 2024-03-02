// This file defines the scripts behind each of the buttons and interactive elements
// in the popup.html file for the popup window

'use strict';

// function setAlarm(event) {
//   const minutes = parseFloat(event.target.value);
//   chrome.action.setBadgeText({ text: 'ON' });
//   chrome.alarms.create({ delayInMinutes: minutes });
//   chrome.storage.sync.set({ minutes: minutes });
//   window.close();
// }

// function clearAlarm() {
//   chrome.action.setBadgeText({ text: '' });
//   chrome.alarms.clearAll();
//   window.close();
// }

document.addEventListener('DOMContentLoaded', function() {
  const startBtn = document.getElementById('start');
  const totalTimeInput = document.getElementById('total-time');
  const studyIntervalInput = document.getElementById('study-interval');
  const breakIntervalInput = document.getElementById('break-interval');

  startBtn.addEventListener('click', function() {
      const totalTime = parseInt(totalTimeInput.value, 10); // Get total time in minutes
      const studyMinutes = parseInt(studyIntervalInput.value, 10); // Get study minutes
      const breakMinutes = parseInt(breakIntervalInput.value, 10); // Get break minutes
      startTimer(totalTime * 60, studyMinutes * 60, breakMinutes * 60); // Convert minutes to seconds and start timer
  });

  function startTimer(totalSeconds, studySeconds, breakSeconds) {
      let secondsLeft = totalSeconds;

      const timerInterval = setInterval(function() {
          if (secondsLeft <= 0) {
              clearInterval(timerInterval);
              alert('Timer ended!');
              // You can perform additional actions here when the timer ends
          } else if (secondsLeft % studySeconds === 0) {
              clearInterval(timerInterval);
              showModal(studySeconds, breakSeconds);
          } else {
              const minutes = Math.floor(secondsLeft / 60);
              const seconds = secondsLeft % 60;
              // Display the remaining time (you can update this based on your UI)
              console.log(`Time remaining: ${minutes} minutes ${seconds} seconds`);
              secondsLeft--;
          }
      }, 1000); // Update every second
  }

  function showModal(studySeconds, breakSeconds) {
      const modal = document.getElementById('modal');
      modal.style.display = 'block';

      const continueWorkingBtn = document.getElementById('continue-working');
      const takeBreakBtn = document.getElementById('take-break');

      continueWorkingBtn.onclick = function() {
          modal.style.display = 'none';
          startTimer(studySeconds, studySeconds, breakSeconds);
      }

      takeBreakBtn.onclick = function() {
          modal.style.display = 'none';
          startTimer(breakSeconds, studySeconds, breakSeconds);
      }
  }
});


// An Alarm delay of less than the minimum 1 minute will fire
// in approximately 1 minute increments if released
// document.getElementById('sampleMinute').addEventListener('click', setAlarm);
// document.getElementById('min15').addEventListener('click', setAlarm);
// document.getElementById('min30').addEventListener('click', setAlarm);
// document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);
