/* global chrome */

import createAllContext from '../modules/create_context';
import { getOptions, getValueFromLocalStorage } from '../modules/local_storage';
import { setPopupClick } from '../modules/popop';

// toggle new window checkbox when mail sender is unchecked
async function toggleNewWindowChbox() {
  const mailOptionsLength = await getValueFromLocalStorage('mailOptionsLength');
  let i;

  for (i = 1; i <= mailOptionsLength; i += 1) {
    const newWinEl = document.getElementById(`new_window_${i}`);
    if (newWinEl) {
      // eslint-disable-next-line no-await-in-loop
      const child = await getValueFromLocalStorage(`mail_picker_${i}`);
      if (!child) {
        document.getElementById(`new_window_${i}`).disabled = true;
      } else {
        document.getElementById(`new_window_${i}`).disabled = false;
      }
    }
  }
}

// Saves options to localStorage.
// only email sender selection
async function saveSenderOptionsFn() {
  const mailOptionsLength = await getValueFromLocalStorage('mailOptionsLength');
  let child;
  let i;
  const nextSenderOptions = {};

  for (i = 0; i <= mailOptionsLength; i += 1) {
    child = document.getElementById(`mail_picker_${i}`);
    if (child) {
      nextSenderOptions[`mail_picker_${i}`] = child.checked;
    }
  }

  for (i = 0; i <= mailOptionsLength; i += 1) {
    child = document.getElementById(`new_window_${i}`);
    if (child) {
      nextSenderOptions[`new_window_${i}`] = child.checked;
    }
  }

  await chrome.storage.local.set(nextSenderOptions);

  toggleNewWindowChbox();

  // Update status to let user know options were saved.

  // reload context menu with new settings
  chrome.contextMenus.removeAll();
  createAllContext();
  setPopupClick();
}

// use the saved values for the form
async function restoreOptionsFn() {
  // get saved values
  let mailOptions = [];
  const mailOptionsLength = await getValueFromLocalStorage('mailOptionsLength');
  let select;
  let mailtype;
  let i;

  mailOptions = await getOptions();

  // Restores check box state
  for (i = 0; i <= mailOptionsLength; i += 1) {
    mailtype = mailOptions[`mail_picker_${i}`];
    select = document.getElementById(`mail_picker_${i}`);
    if (select) {
      if (mailtype) {
        select.checked = true;
      } else {
        select.checked = false;
      }
    }
  }
  for (i = 0; i <= mailOptionsLength; i += 1) {
    mailtype = mailOptions[`new_window_${i}`];
    select = document.getElementById(`new_window_${i}`);
    if (select) {
      if (mailtype) {
        select.checked = true;
      } else {
        select.checked = false;
      }
    }
  }

  const toEmailAdd = mailOptions.mail_to;
  document.getElementById('mail_to').value = toEmailAdd;

  const beforeMsg = mailOptions.mail_before;
  document.getElementById('mail_before').value = beforeMsg;

  const afterMsg = mailOptions.mail_after;
  document.getElementById('mail_after').value = afterMsg;

  const { newLineAfter } = mailOptions;
  select = document.getElementById('newLineAfter');
  if (select) {
    if (newLineAfter) {
      select.checked = true;
      document.getElementById('newLineAfterNum').disabled = false;
    } else {
      document.getElementById('newLineAfterNum').disabled = true;
    }
  }

  let { newLineAfterNum } = mailOptions;
  if (newLineAfterNum === undefined) {
    newLineAfterNum = 0;
  }
  document.getElementById('newLineAfterNum').value = newLineAfterNum;

  const { newLineBefore } = mailOptions;
  select = document.getElementById('newLineBefore');
  if (select) {
    if (newLineBefore) {
      select.checked = true;
      document.getElementById('newLineBeforeNum').disabled = false;
    } else {
      document.getElementById('newLineBeforeNum').disabled = true;
    }
  }

  let { newLineBeforeNum } = mailOptions;
  if (newLineBeforeNum === undefined) {
    newLineBeforeNum = 0;
  }
  document.getElementById('newLineBeforeNum').value = newLineBeforeNum;

  toggleNewWindowChbox();
}

export const saveSenderOptions = saveSenderOptionsFn;
export const restoreOptions = restoreOptionsFn;
