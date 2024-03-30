//Start button functionality
// This file defines the scripts behind each of the buttons and interactive elements
// in the popup.html file for the popup window

'use strict';

showEmotionMask()

// Set up global buttons
const startBtn = document.getElementById('start');
const cancelBtn = document.getElementById('cancel');

window.onload = async () => {
  if(localStorage.getItem('name') != null){
    document.getElementById('name').value = localStorage.getItem('name');
  }
  if(localStorage.getItem('designation') != null){
    document.getElementById('designation').value = localStorage.getItem('designation');
  }
  if(localStorage.getItem('task') != null){
    document.getElementById('task').value = localStorage.getItem('task');
  }
  if(localStorage.getItem('studyInterval') != null){
    document.getElementById('study-interval').value = localStorage.getItem('studyInterval');
  }
  if(localStorage.getItem('breakInterval') != null){
    document.getElementById('break-interval').value = localStorage.getItem('breakInterval');
  }
  if(localStorage.getItem('hobbies') != null){
    document.getElementById('hobbies').value = localStorage.getItem('hobbies');
  }
}

chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === 'totaltimealarm') {
    // Code to execute when totaltimealarm is triggered
    console.log('Alarm 1 triggered');
    hideMask1();
    showMask2();

  } 
  else if (alarm.name === 'alarm2') {
    // Code to execute when alarm2 is triggered
    console.log('Alarm 2 triggered');
  }
});

// Alarm functions
function setAlarm(studyinterval) {
  disableStartButton();
  //enableCancelButton();
  chrome.action.setBadgeText({ text: 'ON' });
  showMask1();

  chrome.alarms.create('totaltimealarm', { delayInMinutes: parseInt(studyinterval) });
  chrome.storage.sync.set({ totalminutes: parseInt(studyinterval) });
}

// Timer variables
var distance = 0;
var x;

function displaytimer(totaltime){
  var countDownDate = new Date().getTime() + totaltime * 60 * 1000; // Convert total time to milliseconds

  //console.log(countDownDate);
  //console.log(new Date().getTime());
  
  // Update the count down every 1 second
  x = setInterval(function() {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      distance = countDownDate - now;
        
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      //console.log(minutes);
      //console.log(seconds);
        
      // Output the result in an element with id="demo"
      document.getElementById("countdown").innerHTML = "Remaining Timer : " + hours + "h "
      + minutes + "m " + seconds + "s ";
        
      // If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "Remaining Timer : 0h 0m 0s ";
        //document.getElementById("countdown").innerHTML = "TIME UP!";
      }

  }, 1000);
}

//Pause session
var pauseBtn = document.getElementById('pause');
pauseBtn.addEventListener('click', function() {
  clearInterval(x);
  chrome.action.setBadgeText({ text: '' });
  chrome.alarms.clearAll();
  hideMask1();
  showPauseMask();
})


//Resume session after pause
var resumeBtn1 = document.getElementById('resume1');
resumeBtn1.addEventListener('click', function() {
  chrome.action.setBadgeText({ text: 'ON' });
  hidePauseMask();
  showMask1();
  var remainingtime = distance;
  //console.log(remainingtime);
  var newtotaltime = new Date().getTime() + remainingtime;
  chrome.alarms.create('totaltimealarm', { when: newtotaltime });
  displaytimer((remainingtime/1000)/60);
})


// Start Break session
var startbreakBtn = document.getElementById('startbreak');
startbreakBtn.addEventListener('click', function() {
  var breakInterval = parseInt(localStorage.getItem('breakInterval'));
  chrome.action.setBadgeText({ text: 'BR' });
  //console.log(breakInterval);
  chrome.alarms.create('breakalarm', { delayInMinutes: breakInterval });
  displaytimer(breakInterval);

  var hobby = localStorage.getItem('hobbies');
  if(hobby == "1"){
    chrome.tabs.create({ url: 'https://www.youtube.com' });
  }
  else if (hobby == "2"){
    chrome.tabs.create({ url: 'https://sketch.io/sketchpad/' });
  }
  else if (hobby == "3"){
    chrome.tabs.create({ url: 'https://www.nytimes.com/games/wordle/index.html' });
  }
  else if (hobby == "4"){
    chrome.tabs.create({ url: 'https://www.notion.so/' });
  }
  else if (hobby == "5"){
    chrome.tabs.create({ url: 'https://openlibrary.org/' });
  }
  else if (hobby == "6"){
    chrome.tabs.create({ url: 'https://open.spotify.com/' });
  }
  else if (hobby == "7"){
    chrome.tabs.create({ url: 'https://www.thechoppingblock.com/cooking-resources' });
  }
  else if (hobby == "8"){
    alert("Have a great time!");
  }
  else if (hobby == "9"){
    alert("Here's to the best beverage!");
  }
})


// Resume Work Session after break
var resumeBtn2 = document.getElementById('resume2');
resumeBtn2.addEventListener('click', function() {
  chrome.action.setBadgeText({ text: 'ON' });
  chrome.alarms.clearAll();
  hideMask3();
  showMask1();
  var totaltime = parseInt(localStorage.getItem('studyInterval'));
  //console.log(remainingtime);
  chrome.alarms.create('totaltimealarm', { delayInMinutes: totaltime });
  displaytimer(totaltime);
})

var skipBtn = document.getElementById('skip');
skipBtn.addEventListener('click', function() {
  chrome.action.setBadgeText({ text: 'ON' });
  chrome.alarms.clearAll();
  hideMask2();
  showMask1();
  var totaltime = parseInt(localStorage.getItem('studyInterval'));
  //console.log(remainingtime);
  chrome.alarms.create('totaltimealarm', { delayInMinutes: totaltime });
  displaytimer(totaltime);
})

// Set up button functionalities for each mask
document.getElementById('cancel1').addEventListener('click', clearAlarm1); // Mask 1 'Cancel Session'
function clearAlarm1() {
  clearInterval(x);
  chrome.action.setBadgeText({ text: '' });
  chrome.alarms.clearAll();
  alert("Your session has been cancelled");
  hideMask1();
  showMain();
  enableStartButton();
  document.getElementById("countdown").innerHTML = "Remaining Timer : 0h 0m 0s ";
  //disableCancelButton();
}


document.getElementById('cancel2').addEventListener('click', clearAlarm2); // Mask 2 'Cancel Session'
function clearAlarm2() {
  clearInterval(x);
  chrome.action.setBadgeText({ text: '' });
  chrome.alarms.clearAll();
  alert("Your session has been cancelled");
  hidePauseMask();
  showMain();
  enableStartButton();
  document.getElementById("countdown").innerHTML = "Remaining Timer : 0h 0m 0s ";
  //disableCancelButton();
}


document.getElementById('cancel3').addEventListener('click', clearAlarm3); // Mask 3 'Cancel Session'
function clearAlarm3() {
  clearInterval(x);
  chrome.action.setBadgeText({ text: '' });
  chrome.alarms.clearAll();
  alert("Your session has been cancelled");
  hideMask2();
  showMain();
  enableStartButton();
  document.getElementById("countdown").innerHTML = "Remaining Timer : 0h 0m 0s ";
  //disableCancelButton();
}

document.getElementById('cancel4').addEventListener('click', clearAlarm3); // Mask 3 'Cancel Session'
function clearAlarm4() {
  clearInterval(x);
  chrome.action.setBadgeText({ text: '' });
  chrome.alarms.clearAll();
  alert("Your session has been cancelled");
  hideMask3();
  showMain();
  enableStartButton();
  document.getElementById("countdown").innerHTML = "Remaining Timer : 0h 0m 0s ";
  //disableCancelButton();
}


document.getElementById('startbreak').addEventListener('click', startbreak); // Mask 2 'Start Break'
function startbreak() {
  hideMask2();
  showMask3();
}

// Session Start + input validation
startBtn.addEventListener('click', validateInput); 
function validateInput(){
  var name = document.getElementById('name');
  var designation = document.getElementById('designation');
  var task = document.getElementById('task');
  //var totaltime = document.getElementById('total-time');
  var studyinterval = document.getElementById('study-interval');
  var breakinterval = document.getElementById('break-interval');
  var hobbies = document.getElementById('hobbies');

  localStorage.setItem('name', name.value);
  localStorage.setItem('designation', designation.value);
  localStorage.setItem('task', task.value);
  localStorage.setItem('studyInterval', studyinterval.value);
  localStorage.setItem('breakInterval', breakinterval.value);
  localStorage.setItem('hobbies', hobbies.value);

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
  //else if (totaltime.value == ""){
    //alert("Total time required!");
    //totaltime.focus();
  //}
  else if (studyinterval.value == ""){
    alert("Work/Study interval (before each break) required!");
    studyinterval.focus();
  }
  else if(parseInt(studyinterval.value) < 1){
    alert("Work/Study interval must be greater than 1 minute!");
    studyinterval.focus();
  }
  else if (breakinterval.value == ""){
    alert("Break length required!");
    breakinterval.focus();
  }
  else if (parseInt(breakinterval.value) < 1){
    alert("Break length must be atleast 1 minute!");
    breakinterval.focus();
  }
  else if (hobbies.value == ""){
    alert("Hobbies required!");
    hobbies.focus();
  }
  /*
  else if(parseInt(studyinterval.value) > parseInt(totaltime.value)){
    //console.log(studyinterval.value)
    //console.log(totaltime.value)
    alert("Study time must not be greater than total time!");
    studyinterval.focus();
  }
  */
  /*
  else if(parseInt(breaktime.value > totaltime.value)){
    alert("Break time must not be greater than total time!");
    breaktime.focus();
  }
  */
  else{
    setAlarm(studyinterval.value);
    displaytimer(studyinterval.value);
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

/*
function disableCancelButton() {
  cancelBtn.classList.add('greyed-out');
  cancelBtn.disabled = true;
}


function enableCancelButton() {
  cancelBtn.classList.remove('greyed-out');
  cancelBtn.disabled = false;
}
*/


// Mask Functions

function showMain(){
  document.getElementById('countdown').style.display = 'none';
  document.getElementById('original-content').style.display = 'block';
  document.getElementById('workmask').style.display = 'none';
  document.getElementById('breakmask').style.display = 'none';
  document.getElementById('inbreakmask').style.display = 'none';
}


function showMask1() {
  document.getElementById("countdown").style.display = 'block';
  document.getElementById('original-content').style.display = 'none';
  document.getElementById('workmask').style.display = 'block';
}


function hideMask1() {
  document.getElementById('original-content').style.display = 'block';
  document.getElementById('workmask').style.display = 'none';
}

function showPauseMask() {
  document.getElementById('original-content').style.display = 'none';
  document.getElementById('workmask').style.display = 'none';
  document.getElementById('pausemask').style.display = 'block';
}


function hidePauseMask() {
  document.getElementById('pausemask').style.display = 'none';
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



/*
Emotion mask incorporation
*/

// Function to open the Penzu website for journal writing
function openJournal() {
  chrome.tabs.create({ url: 'https://penzu.com/' });
}

// Function to show the emotion input mask
function showEmotionMask() {
  document.getElementById('original-content').style.display = 'none';
  document.getElementById('emotion-mask').style.display = 'block';
  document.getElementById('chatbot-mask').style.display = 'none';
}

function showChatmask() {
  document.getElementById('original-content').style.display = 'none';
  document.getElementById('emotion-mask').style.display = 'none';
  document.getElementById('chatbot-mask').style.display = 'block';
  document.getElementById('decision-mask').style.display = 'none';
}



// Add event listener to each emotion icon
// Function to display custom notification about the selected emotion
function showEmotionNotification(emotion) {
  var message = "";
  switch(emotion) {
      case "happy":
          message = "You're doing great! Keep up the positive vibes!";
          break;
      case "sad":
          message = "It's okay to feel down sometimes. Remember, tomorrow is a new day!";
          break;
      case "angry":
          message = "Take a deep breath. It's okay to feel angry. Let's work through it together.";
          break;
      // Add more cases for other emotions if needed
      default:
          message = "You're doing great! Keep up the good work!";
          break;
  }
  // Display the customized message as an alert
  alert(message);
}
// Add event listener to each emotion icon
var emotionIcons = document.querySelectorAll('.emotion-icon');
emotionIcons.forEach(function(icon) {
  icon.addEventListener('click', function() {
      var selectedEmotion = icon.getAttribute('data-emotion');
      // Display custom notification about the selected emotion
      showEmotionNotification(selectedEmotion);
      // Hide the emotion input mask
      document.getElementById('emotion-mask-container').style.display = 'none';
      document.getElementById('decision-mask-container').style.display = 'block';
  });
});

document.getElementById('continue-working').addEventListener('click', function() {
  // Hide the decision mask and show the original content
  document.getElementById('decision-mask-container').style.display = 'none';
  document.getElementById('original-content').style.display = 'block';
});

document.getElementById('go-to-journal').addEventListener('click', function() {
  // Perform actions to go to the journaling page
  openJournal();
  // For example, you can open a new tab with the journaling page
  // Or you can redirect the user to the journaling page
  // Here, we'll simply log a message
  console.log("Redirecting to journaling page...");
});

document.getElementById('chatbot-button').addEventListener('click', function() {
  showChatmask()
  console.log("Redirecting to journaling page...");
});

function ShowDecisionmask(){
  document.getElementById('chatbot-mask').style.display = 'none';
  document.getElementById('decision-mask').style.display = 'block';
  document.getElementById('original-content').style.display = 'none';
  document.getElementById('emotion-mask').style.display = 'none';
  


}



document.getElementById('delete-button').addEventListener('click', function() {
  ShowDecisionmask()

});
