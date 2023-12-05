/* global chrome */

import '../images/stock_mail.png';
import {
  saveDefaultOptions,
  getOptionsShownCount,
  getSingleOptionInt,
  getValueFromLocalStorage,
} from './modules/local_storage';
import createAllContext from './modules/create_context';
import { openEmailHandler } from './modules/email_service_link';

const init = async () => {
  // Creates each of the links to be used by each type of Email client
  if ((await getValueFromLocalStorage('mailOptionsLength')) !== 7) {
    await chrome.storage.local.set({ mailOptionsLength: 7 });
  }
  // Turn off all Inbox selections
  if ((await getValueFromLocalStorage('mail_picker_6')) !== false) {
    await chrome.storage.local.set({ mail_picker_6: false });
  }

  // check for first run
  const firstRun = await getValueFromLocalStorage('firstRun');
  // run actions if first run & no settings saved
  if (firstRun === true) {
    // Set all options to default
    saveDefaultOptions();
  }
  if (firstRun !== false) {
    await chrome.storage.local.set({ firstRun: false });
  }

  // Create email menu option for each context type
  createAllContext();

  // Check if only one option selected
  if (getOptionsShownCount() === 1) {
    chrome.action.setPopup({ popup: '' });
    chrome.action.onClicked.addListener(() => {
      openEmailHandler(getSingleOptionInt());
    });
  } else {
    chrome.action.setPopup({ popup: 'popup.html' });
  }
};
init();
