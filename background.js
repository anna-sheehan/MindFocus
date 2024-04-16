// This file creates the listeners in Chrome for button clicks and notifications and
// then defines actions based on each

'use strict';

chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === 'totaltimealarm') {
      // Code to execute when alarm1 is triggered
      chrome.notifications.create({
          type: 'basic',
          iconUrl: 'images/homeimage.png',
          title: 'MindFocus',
          message: "Yay, break time! Let's take a mindful break!"
      });
  } else if (alarm.name === 'breakalarm') {
      // Code to execute when alarm2 is triggered
      chrome.notifications.create({
          type: 'basic',
          iconUrl: 'images/homeimage.png',
          title: 'MindFocus',
          message: "Break time is up! Let's get back to work! Please get back to the popup tab!"
      });
  }
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    console.log(tabId);

    chrome.storage.sync.get('myExtensionTabId', function(result) {
      console.log(result.myExtensionTabId);
      if (tabId === result.myExtensionTabId) {
        console.log("tab removed");
        chrome.alarms.clearAll();
        chrome.action.setBadgeText({ text: '' });
        return;
      }
    })

    
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  // Check if the changeInfo status is 'complete' to ensure the page is fully reloaded
  if (changeInfo.status === 'complete') {
      // Now you need to determine if this is the tab you are tracking
      chrome.storage.sync.get('myExtensionTabId', function(result) {
          if (tabId === result.myExtensionTabId) {
              // The tab you are tracking has been reloaded, perform your tasks here
              console.log('The extension tab was reloaded.');

              // Perform any reset or cleanup operations here
              // Example: Resetting a timer or clearing alarms
              chrome.alarms.clearAll(() => {
                  console.log('All alarms cleared due to tab reload.');
              });
              chrome.action.setBadgeText({ text: '' });
          }
      });
  }
});