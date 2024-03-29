/* global chrome */

import addNewLines from '../modules/add_new_lines';
import createAllContext from '../modules/create_context';
import { setPopupClick } from '../modules/popop';

// only email body section
function validateBodyOptionsFn() {
  let errorFound = false;
  let currentItem;

  const newLineAfterEl = document.getElementById('newLineAfter');
  if (newLineAfterEl && newLineAfterEl.checked) {
    currentItem = document.getElementById('newLineAfterNum');
    if (currentItem && currentItem.value < 0) {
      // alert("New line before URL needs to be 0 or higher");
      errorFound = true;
    }
    if (Number.isNaN(currentItem.value) || currentItem.value === '') {
      // alert("New line before URL is not a number");
      errorFound = true;
    }
  }

  const newLineBeforeEl = document.getElementById('newLineBefore');
  if (newLineBeforeEl && newLineBeforeEl.checked) {
    currentItem = document.getElementById('newLineBeforeNum');
    if (currentItem && currentItem.value < 0) {
      // alert("New line after URL needs to be 0 or higher");
      errorFound = true;
    }
    if (Number.isNaN(currentItem.value) || currentItem.value === '') {
      // alert("New line after URL is not a number");
      errorFound = true;
    }
  }

  return errorFound;
}

// Saves options to localStorage.
// only email body section
async function saveBodyOptionsFn() {
  await chrome.storage.local.set({
    mail_to: document.getElementById('mail_to').value,
    mail_before: document.getElementById('mail_before').value,
    mail_after: document.getElementById('mail_after').value,
    newLineAfter: document.getElementById('newLineAfter').checked,
    newLineAfterNum: document.getElementById('newLineAfterNum').value,
    newLineBefore: document.getElementById('newLineBefore').checked,
    newLineBeforeNum: document.getElementById('newLineBeforeNum').value,
  });

  // Update status to let user know options were saved.
  const status = document.getElementById('status');
  const statusCss = ['alert', 'alert-success', 'text-center'];
  status.innerHTML = '<strong>Email body settings saved</strong>';
  status.parentElement.classList.add(statusCss);
  status.style.display = 'inline';
  setTimeout(() => {
    status.innerHTML = '';
    status.parentElement.classList.remove(statusCss);
    status.style.display = 'none';
  }, 3000);

  // reload context menu with new settings
  chrome.contextMenus.removeAll();
  createAllContext();
  setPopupClick();
}

// update preview
function getPreviewFn() {
  // update preview text
  const preview = document.getElementById('previewText');
  let startMessage = document.getElementById('mail_before').value;
  let endMessage = document.getElementById('mail_after').value;
  const newLineAfter = document.getElementById('newLineAfter').checked;
  const newLineAfterNum = document.getElementById('newLineAfterNum').value;
  const newLineBefore = document.getElementById('newLineBefore').checked;
  const newLineBeforeNum = document.getElementById('newLineBeforeNum').value;

  let previewText = '';
  const exampleAddress = 'http://www.google.com';

  // get new line string
  const newLineAfterBody = addNewLines(newLineAfter, newLineAfterNum, '<br/>');
  const newLineBeforeBody = addNewLines(
    newLineBefore,
    newLineBeforeNum,
    '<br/>'
  );

  if (startMessage !== '' && newLineAfterBody === '') {
    startMessage += ' ';
  }
  if (endMessage !== '' && newLineBeforeBody === '') {
    endMessage = ` ${endMessage}`;
  }

  // set preview text
  previewText =
    startMessage +
    newLineAfterBody +
    exampleAddress +
    newLineBeforeBody +
    endMessage;

  // send preview to display
  preview.innerHTML = previewText;
}

export const validateBodyOptions = validateBodyOptionsFn;
export const saveBodyOptions = saveBodyOptionsFn;
export const getPreview = getPreviewFn;
