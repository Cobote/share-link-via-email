/* global chrome */

import '../images/stock_mail.png';
import {
  saveDefaultOptions,
  getValueFromLocalStorage,
} from './modules/local_storage';
import createAllContext from './modules/create_context';
import { setPopupClick, openEmail } from './modules/popop';

chrome.action.onClicked.addListener(openEmail);

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
  if (firstRun !== false) {
    // Set all options to default
    saveDefaultOptions();
  }
  if (firstRun !== false) {
    await chrome.storage.local.set({ firstRun: false });
  }

  // Create email menu option for each context type
  createAllContext();
  setPopupClick();
};
init();
