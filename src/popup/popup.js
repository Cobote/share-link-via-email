/* global chrome */
// functions used by the "popup" page of the extension

import './popup.css';

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', () => {
  const { mailOptionsLength } = localStorage;
  let i;
  // on load events
  showHide_options();
  // end on load

  // listeners
  $('#optionsLink').click(chrome.runtime.openOptionsPage());

  for (i = 1; i <= mailOptionsLength; i += 1) {
    $(`#mail_picker_${i}`).click(mail_picker_clickHandler);
  }
});
