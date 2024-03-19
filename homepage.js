// Homepage.js
// This document defines the functionality of the popup homescreen window
//// Will open MindFocus in a new tab

'use strict';

window.onload = async () => {
    document.getElementById('initialize').onclick = () => {
      window.open('popup.html', '_blank');
    };
  };