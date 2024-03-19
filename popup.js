//Start button functionality
// This file defines the scripts behind each of the buttons and interactive elements
// in the popup.html file for the popup window

'use strict';


// Set up global buttons
const startBtn = document.getElementById('start');
const cancelBtn = document.getElementById('cancel');


// Alarm functions
function setAlarm(totaltime, breaktime, studyinterval) {
  disableStartButton();
  enableCancelButton();
  chrome.action.setBadgeText({ text: 'ON' });
  showMask1();

  const studyTime = parseInt(studyinterval.value) * 60; // Convert study interval to seconds
  const breakTime = parseInt(breaktime.value) * 60; // Convert break interval to seconds
  const totalTime = parseInt(totaltime.value) * 60; // Convert total time to seconds
  
  let currentTime = 0;
  let studyAlertShown = false; // Variable to track if study alert has been shown
  let breakAlertShown = false; // Variable to track if break alert has been shown

  const timerInterval = setInterval(function() {
    if (currentTime >= totalTime) {
      enableStartButton();
      disableCancelButton();
      clearInterval(timerInterval); // Stop the timer when total time is reached
      alert("Timer completed!"); // Show completion message
      showMain();
      return;
    }
    
    if (!studyAlertShown && currentTime % (studyTime + breakTime) < studyTime) {
      // It's study time and study alert has not been shown yet
      // alert("Study time!"); 
      hideMask2();
      showMask1();
      studyAlertShown = true; // Set studyAlertShown to true to prevent showing study alert again
      breakAlertShown = false; // Reset breakAlertShown
    } 
    else if (!breakAlertShown && currentTime % (studyTime + breakTime) >= studyTime) {
      alert("Break time!"); 
      hideMask1();
      showMask2();
      breakAlertShown = true; // Set breakAlertShown to true to prevent showing break alert again
      studyAlertShown = false; // Reset studyAlertShown

    }

    currentTime += 1; // Increment current time by 1 second

    if (currentTime >= totalTime) {
      clearInterval(timerInterval); // Stop the timer when total time is reached
      alert("Timer completed!"); // Show completion message
      showMain();
      enableStartButton();
      disableCancelButton();
    }
  }, 1000); // Update every second

  chrome.alarms.create('totaltimealarm', { delayInMinutes: parseInt(totaltime.value) });
  chrome.storage.sync.set({ totalminutes: parseInt(totaltime.value) });
}


function resumeAlarm() {
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


// Set up button functionalities for each mask
document.getElementById('cancel').addEventListener('click', clearAlarm); // Original page 'Cancel Session'
function clearAlarm() {
  chrome.action.setBadgeText({ text: '' });
  chrome.alarms.clearAll();
  alert("Your session has been cancelled");
  showMain();
  enableStartButton();
  disableCancelButton();
}

document.getElementById('cancel1').addEventListener('click', clearAlarm1); // Mask 1 'Cancel Session'
function clearAlarm1() {
  chrome.action.setBadgeText({ text: '' });
  chrome.alarms.clearAll();
  alert("Alarm has been cancelled");
  hideMask1();
  enableStartButton();
  disableCancelButton();
}


document.getElementById('cancel2').addEventListener('click', clearAlarm2); // Mask 2 'Cancel Session'
function clearAlarm2() {
  chrome.action.setBadgeText({ text: '' });
  chrome.alarms.clearAll();
  alert("Alarm has been cancelled");
  hideMask2();
  enableStartButton();
  disableCancelButton();
}


document.getElementById('cancel3').addEventListener('click', clearAlarm3); // Mask 3 'Cancel Session'
function clearAlarm3() {
  chrome.action.setBadgeText({ text: '' });
  chrome.alarms.clearAll();
  alert("Alarm has been cancelled");
  hideMask3();
  enableStartButton();
  disableCancelButton();
}


document.getElementById('startbreak').addEventListener('click', startbreak); // Mask 2 'Start Break'
function startbreak() {
  hideMask2();
  showMask3();
}


startBtn.addEventListener('click', validateInput); // Original page input validation
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
  else if(parseInt(studyinterval.value) > parseInt(totaltime.value)){
      console.log(studyinterval.value)
      console.log(totaltime.value)
      alert("Study time must not be greater than total time!");
      studyinterval.focus();
    }
    else if(parseInt(breaktime.value > totaltime.value)){
      alert("Break time must not be greater than total time!");
      breaktime.focus();
    }
    else{
      setAlarm(totaltime, studyinterval, breaktime);
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


function disableCancelButton() {
  cancelBtn.classList.add('greyed-out');
  cancelBtn.disabled = true;
}


function enableCancelButton() {
  cancelBtn.classList.remove('greyed-out');
  cancelBtn.disabled = false;
}



// Mask Functions

function showMain(){
  document.getElementById('original-content').style.display = 'block';
  document.getElementById('workmask').style.display = 'none';
  document.getElementById('breakmask').style.display = 'none';
  document.getElementById('inbreakmask').style.display = 'none';
}


function showMask1() {
  document.getElementById('original-content').style.display = 'none';
  document.getElementById('workmask').style.display = 'block';
}


function hideMask1() {
  document.getElementById('original-content').style.display = 'block';
  document.getElementById('workmask').style.display = 'none';
}


function showMask2() {
  document.getElementById('original-content').style.display = 'none';
  document.getElementById('breakmask').style.display = 'block';
}


function hideMask2() {
  document.getElementById('original-content').style.display = 'block';
  document.getElementById('breakmask').style.display = 'none';
}


function showMask3() {
  document.getElementById('original-content').style.display = 'none';
  document.getElementById('inbreakmask').style.display = 'block';
}


function hideMask3() {
  document.getElementById('original-content').style.display = 'block';
  document.getElementById('inbreakmask').style.display = 'none';
}






