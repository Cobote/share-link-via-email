/* global chrome */

import '../images/stock_mail.png';
import {
  saveDefaultOptions,
  getOptionsShownCount,
  getSingleOptionInt,
} from './modules/local_storage';
import createAllContext from './modules/create_context';
import { openEmailHandler } from './modules/email_service_link';

// Creates each of the links to be used by each type of Email client
chrome.storage.local.set({ mailOptionsLength: 7 });
// Turn off all Inbox selections
chrome.storage.local.set({ mail_picker_6: false });

// check for first run
chrome.storage.local.get(['firstRun']).then(async (result) => {
  let firstRun = result.firstRun === 'true';

  // now save that first run has started
  if (!firstRun) {
    chrome.storage.local.set({ firstRun: 'false' });

    // check if any settings have been saved
    const mailOptionsLength = await chrome.storage.sync.get(
      'mailOptionsLength'
    );
    let i;

    for (i = 0; i <= mailOptionsLength; i += 1) {
      const iName = `mail_picker_${i}`;
      // eslint-disable-next-line no-loop-func
      chrome.storage.local.get([iName]).then((iNameResult) => {
        const mailPickerI = iNameResult[iName];

        if (mailPickerI === 'true' || mailPickerI === 'false') {
          firstRun = 'true';
          // console.log("Not first time - found save option: localStorage['mail_picker_"+ i +"']
          // as "+ localStorage["mail_picker_"+i]);
        }
      });
    }
  }

  // run actions if first run & no settings saved
  if (!firstRun) {
    // Set all options to default
    saveDefaultOptions();
  }
});

// Create email menu option for each context type
createAllContext();

// Check if only one option selected
if (getOptionsShownCount() === 1) {
  chrome.browserAction.setPopup({ popup: '' });
  chrome.browserAction.onClicked.addListener(() => {
    openEmailHandler(getSingleOptionInt());
  });
} else {
  chrome.browserAction.setPopup({ popup: 'popup.html' });
}
