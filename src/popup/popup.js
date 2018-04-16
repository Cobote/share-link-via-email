/* global chrome */
// functions used by the "popup" page of the extension

import './popup.css';
import showHideOptions from './showHideOptions';
import mailPickerClickHandler from './click_handler';

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', () => {
  const { mailOptionsLength } = localStorage;
  let i;
  // on load events
  showHideOptions();
  // end on load

  // listeners
  document.getElementById('optionsLink').addEventListener('click', chrome.runtime.openOptionsPage);

  for (i = 1; i <= mailOptionsLength; i += 1) {
    document.getElementById(`mail_picker_${i}`).addEventListener('click', mailPickerClickHandler);
  }
});
