/* global chrome */

import { getOptions } from '../modules/local_storage';

// toggle new window checkbox when mail sender is unchecked
function toggleNewWindowChbox() {
  const { mailOptionsLength } = localStorage;
  let child;
  let i;

  for (i = 1; i <= mailOptionsLength; i += 1) {
    child = localStorage[`mail_picker_${i}`];
    if (child === 'false') {
      document.getElementById(`new_window_${i}`).disabled = true;
    } else {
      document.getElementById(`new_window_${i}`).disabled = false;
    }
  }
}

// Saves options to localStorage.
// only email sender selection
function saveSenderOptionsFn() {
  const { mailOptionsLength } = localStorage;
  let child;
  let i;

  for (i = 0; i <= mailOptionsLength; i += 1) {
    child = document.getElementById(`mail_picker_${i}`);
    localStorage[`mail_picker_${i}`] = child.checked;
  }

  for (i = 0; i <= mailOptionsLength; i += 1) {
    child = document.getElementById(`new_window_${i}`);
    localStorage[`new_window_${i}`] = child.checked;
  }

  toggleNewWindowChbox();

  // Update status to let user know options were saved.

  // reload context menu with new settings
  chrome.contextMenus.removeAll();
  chrome.extension.getBackgroundPage().window.location.reload();
}

// use the saved values for the form
function restoreOptionsFn() {
  // get saved values
  let mailOptions = [];
  const { mailOptionsLength } = localStorage;
  let select;
  let mailtype;
  let i;

  mailOptions = getOptions();

  // Restores check box state
  for (i = 0; i <= mailOptionsLength; i += 1) {
    mailtype = mailOptions[`mail_picker_${i}`];
    select = document.getElementById(`mail_picker_${i}`);
    if (mailtype === 'true') {
      select.checked = true;
    } else {
      select.checked = false;
    }
  }
  for (i = 0; i <= mailOptionsLength; i += 1) {
    mailtype = mailOptions[`new_window_${i}`];
    select = document.getElementById(`new_window_${i}`);
    if (mailtype === 'true') {
      select.checked = true;
    } else {
      select.checked = false;
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
  if (newLineAfter === 'true') {
    select.checked = true;
    document.getElementById('newLineAfterNum').disabled = false;
  } else {
    document.getElementById('newLineAfterNum').disabled = true;
  }

  let { newLineAfterNum } = mailOptions;
  if (newLineAfterNum === undefined) {
    newLineAfterNum = 0;
  }
  document.getElementById('newLineAfterNum').value = newLineAfterNum;

  const { newLineBefore } = mailOptions;
  select = document.getElementById('newLineBefore');
  if (newLineBefore === 'true') {
    select.checked = true;
    document.getElementById('newLineBeforeNum').disabled = false;
  } else {
    document.getElementById('newLineBeforeNum').disabled = true;
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
