/* global chrome */

import { openEmailHandler } from './email_service_link';
import { getOptionsShownCount, getSingleOptionInt } from './local_storage';

async function openEmail() {
  if ((await getOptionsShownCount()) === 1) {
    openEmailHandler(await getSingleOptionInt());
  }
}

export function addPopupListener() {
  chrome.action.onClicked.addListener(openEmail);
}

// Check if only one option selected
export async function setPopupClick() {
  if ((await getOptionsShownCount()) === 1) {
    chrome.action.setPopup({ popup: '' });
  } else {
    chrome.action.setPopup({ popup: 'popup.html' });
  }
}
