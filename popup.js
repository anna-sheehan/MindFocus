// This file defines the scripts behind each of the buttons and interactive elements
// in the popup.html file for the popup window

'use strict';

function setAlarm(event) {
  //alert(event.value);
  //alert(chrome.storage.sync.get(['totalminutes']));
  //return;
  /*
  if(chrome.storage.sync.get(['totalminutes']) != null){
    alert("An existing alarm is already in place!");
    return;
  }
  */
  const minutes = parseFloat(event.value);
  chrome.action.setBadgeText({ text: 'ON' });
  chrome.alarms.create('totaltimealarm',{ delayInMinutes: minutes });
  chrome.storage.sync.set({ totalminutes: minutes });
  alert("Alarm has been created!");
  var startbutton = document.getElementById('start');
  startbutton.disabled = true;
  startbutton.innerHTML = 'Alarm set!';
  window.close();
  
}

function resumeAlarm() {
  return;
}

document.getElementById('cancel').addEventListener('click', clearAlarm);
function clearAlarm() {
  chrome.action.setBadgeText({ text: '' });
  chrome.alarms.clear('totaltimealarm');
  alert("Alarm has been cancelled!");
  chrome.storage.sync.remove(['totalminutes']);
  window.close();
}

document.getElementById('start').addEventListener('click', validateInput);
function validateInput(){
  var name = document.getElementById('name');
  var designation = document.getElementById('designation');
  var task = document.getElementById('tasktodo');
  var totaltime = document.getElementById('total-time');
  var breaktime = document.getElementById('break-interval');
  var studyinterval = document.getElementById('study-interval');

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
  else{
    setAlarm(totaltime);
  }
  
}

// An Alarm delay of less than the minimum 1 minute will fire
// in approximately 1 minute increments if released
/*
document.getElementById('sampleMinute').addEventListener('click', setAlarm);
document.getElementById('min15').addEventListener('click', setAlarm);
document.getElementById('min30').addEventListener('click', setAlarm);
document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);
*/