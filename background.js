// This file creates the listeners in Chrome for button clicks and notifications and
// then defines actions based on each

'use strict';

chrome.alarms.onAlarm.addListener(() => {
  chrome.action.setBadgeText({ text: '' });
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'images/homeimage.png',
    title: 'MindFocus',
    message: "Let's take a mindful break!",
    buttons: [{ title: 'Yay, break time' }, { title: 'No, keep working' }],
    priority: 0
  });
});

chrome.notifications.onButtonClicked.addListener(async (notificationId, buttonIndex) => {
  const item = await chrome.storage.sync.get(['totalminutes']);
  chrome.action.setBadgeText({ text: 'ON' });
  if(buttonIndex == 0)
  {
    chrome.action.setBadgeText({ text: 'BR' });
    chrome.alarms.clear('totaltimealarm');
    chrome.storage.sync.remove(['totalminutes']);
  }
  if(buttonIndex == 1){
    chrome.alarms.create({ delayInMinutes: item.totalminutes });
  }
});

chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
  if(buttonIndex === 0)
    chrome.tabs.create({ url: 'https://www.youtube.com' });
});