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

chrome.notifications.onButtonClicked.addListener(async () => {
  const item = await chrome.storage.sync.get(['minutes']);
  chrome.action.setBadgeText({ text: 'ON' });
  chrome.alarms.create({ delayInMinutes: item.minutes });
});
