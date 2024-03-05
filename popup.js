//Start button functionality
// This file defines the scripts behind each of the buttons and interactive elements
// in the popup.html file for the popup window

// An Alarm delay of less than the minimum 1 minute will fire
// in approximately 1 minute increments if released

// document.getElementById('sampleMinute').addEventListener('click', setAlarm);
// document.getElementById('min15').addEventListener('click', setAlarm);
// document.getElementById('min30').addEventListener('click', setAlarm);
// document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);

'use strict';

const startBtn = document.getElementById('start');
const cancelBtn = document.getElementById('cancel');

function setAlarm(totaltime, breaktime, studyinterval) {
  //alert(event.value);
  const minutes = parseFloat(totaltime.value);
  chrome.action.setBadgeText({ text: 'ON' });
  chrome.alarms.create('totaltimealarm',{ delayInMinutes: minutes });
  chrome.storage.sync.set({ totalminutes: minutes });
  alert("Alarm has been created!");
  disableStartButton();
}

function resumeAlarm() {
  return;
}

document.getElementById('cancel').addEventListener('click', clearAlarm);
function clearAlarm() {
  chrome.action.setBadgeText({ text: '' });
  chrome.alarms.clearAll();
  alert("Alarm has been cancelled!");
  //chrome.storage.sync.remove(['totalminutes']);
  enableStartButton();
}

startBtn.addEventListener('click', validateInput);
function validateInput(){
  var name = document.getElementById('name');
  var designation = document.getElementById('designation');
  var task = document.getElementById('task');
  var totaltime = document.getElementById('total-time');
  var breaktime = document.getElementById('break-interval');
  var studyinterval = document.getElementById('study-interval');
  var hobbies = document.getElementById('hobbies');

  //Validating user input
  if (name.value == ""){
    alert("Name required!");
    name.focus();
  }
  else if (designation.value == ""){
    alert("Designation required!");
    designation.focus();
  }
  else if (task.value == ""){
    alert("Task required!");
    task.focus();
  }
  else if (totaltime.value == ""){
    alert("Total time required!");
    totaltime.focus();
  }
  else if (breaktime.value == ""){
    alert("Break length required!");
    breaktime.focus();
  }
  else if (studyinterval.value == ""){
    alert("Study time (before each break) required!");
    studyinterval.focus();
  }
  else if (hobbies.value == ""){
    alert("Hobbies required!");
    hobbies.focus();
  }
  else{
    if(studyinterval.value > totaltime.value){
      alert("Study time must not be greater than total time!");
      studyinterval.focus();
    }
    else if(breaktime.value > totaltime.value){
      alert("Break time must not be greater than total time!");
      breaktime.focus();
    }
    else{
      setAlarm(totaltime, studyinterval, breaktime);
    }
    
  }
  
}

function disableStartButton() {
  startBtn.classList.add('greyed-out');
  startBtn.disabled = true;
}

function enableStartButton() {
  startBtn.classList.remove('greyed-out');
  startBtn.disabled = false;
}

function studybreaks(totaltime, breaktime, studyinterval) {

  return;
}

function displaytimer(totaltime){
  let countdown;
  const temp = parseFloat(totaltime.value);
  const totalSeconds = temp*60;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  document.getElementById('countdown').innerText = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
  totalSeconds--;
}

/*
document.addEventListener('DOMContentLoaded', function() {
  const startBtn = document.getElementById('start');
  const cancelBtn = document.getElementById('cancel');
  startBtn.addEventListener('click', function() {
    const totalTimeInput = document.getElementById('total-time');
    const studyIntervalInput = document.getElementById('study-interval');
    const breakIntervalInput = document.getElementById('break-interval');
    
    const totalTime = parseInt(totalTimeInput.value, 10); // Total time in minutes
    const studyInterval = parseInt(studyIntervalInput.value, 10); // Study interval in minutes
    const breakInterval = parseInt(breakIntervalInput.value, 10); // Break interval in minutes

    //startTimer(totalTime, studyInterval, breakInterval); // Start the timer
    
  });;
*/
/*
  function startTimer(totalSeconds, studySeconds, breakSeconds) {
      let secondsLeft = totalSeconds;
      let studyCounter = 0; // Initialize study counter

      const timerInterval = setInterval(function() {
          if (secondsLeft <= 0) {
              clearInterval(timerInterval);
              alert('Timer ended!');
              // You can perform additional actions here when the timer ends
          } else {
              const minutes = Math.floor(secondsLeft / 60);
              const seconds = secondsLeft % 60;
              // Display the remaining time (you can update this based on your UI)
              console.log(`Time remaining: ${minutes} minutes ${seconds} seconds`);
              secondsLeft--;

              // Check if it's time for a break
              if (studyCounter >= studySeconds) {
                  clearInterval(timerInterval);
                  alert('Study time over, take a break!');
                  startBreakTimer(breakSeconds);
                  studyCounter = 0; // Reset the study counter
              }

              // Increment the study counter
              studyCounter++;
          }
      }, 1000); // Update every second
  }

  function startBreakTimer(breakSeconds) {
      let secondsLeft = breakSeconds;

      const breakTimerInterval = setInterval(function() {
          if (secondsLeft <= 0) {
              clearInterval(breakTimerInterval);
              alert('Break time is over. Back to work!');
              // You can perform additional actions here after the break ends
          } else {
              const minutes = Math.floor(secondsLeft / 60);
              const seconds = secondsLeft % 60;
              // Display the remaining break time (you can update this based on your UI)
              console.log(`Break time remaining: ${minutes} minutes ${seconds} seconds`);
              secondsLeft--;
          }
      }, 1000); // Update every second
  }
  */

/*
document.getElementById('sampleMinute').addEventListener('click', setAlarm);
document.getElementById('min15').addEventListener('click', setAlarm);
document.getElementById('min30').addEventListener('click', setAlarm);
document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);
*/