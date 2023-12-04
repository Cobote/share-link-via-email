/* global chrome */

import { getOptions } from '../modules/local_storage';

// use the saved values for the form
function showHideOptions() {
  // get saved values
  const { mailOptionsLength } = chrome.storage.local;
  let select;
  let mailtype;
  let i;
  const mailOptions = getOptions();
  let isOptionSet = false;

  // Hide options not selected
  for (i = 0; i <= mailOptionsLength; i += 1) {
    mailtype = mailOptions[`mail_picker_${i}`];
    select = document.getElementById(`mail_picker_${i}`);
    if (select) {
      if (mailtype !== 'true') {
        select.style.display = 'none';
      } else {
        isOptionSet = true;
      }
    }
  }

  // Check if no options have been selected
  if (!isOptionSet) {
    document.getElementById('mail_picker_none').style.display = 'inline';
  }
}

export default showHideOptions;
