// Homepage.js
// This document defines the functionality of the popup homescreen window
//// Will open MindFocus in a new tab

'use strict';

window.onload = async () => {
    document.getElementById('initialize').onclick = () => {
      //Check if MindFocus is already open
      var localPagePath = "popup.html";
      var tabExists = false;

      chrome.tabs.query({}, function(tabs) {
        tabs.forEach(function(existingTab) {
            console.log(existingTab.url);
            console.log(chrome.runtime.getURL(localPagePath));
            if (existingTab.url === chrome.runtime.getURL(localPagePath)) {
                tabExists = true;
                // Activate existing tab
                chrome.tabs.update(existingTab.id, { active: true });
                return;
            }
        });
        //Creates a new mindfocus tab in case it doesn't already exist
        if(!tabExists){
          chrome.tabs.create({ url: "popup.html" }, function(tab) {
            //chrome.localStorage.setItem('myExtensionTabId', myExtensionTabId);
            chrome.storage.sync.set({ 'myExtensionTabId': tab.id });
          });
        }
      });
    };
  };