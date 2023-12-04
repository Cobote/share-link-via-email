/* global chrome */

// Restores saved values from localStorage.
// if none saved, use default values
function getOptionsFn() {
  const chromeLocalStorage = chrome.storage.local;

  const mailOptions = [];
  const { mailOptionsLength } = chromeLocalStorage;
  let i;

  // Restores each mail type
  for (i = 0; i <= mailOptionsLength; i += 1) {
    if (chromeLocalStorage[`mail_picker_${i}`]) {
      mailOptions[`mail_picker_${i}`] = chromeLocalStorage[`mail_picker_${i}`];
    } else {
      // if not set, leave as off
      mailOptions[`mail_picker_${i}`] = 'false';
      // console.log("mail_picker_" + i + " not found");
    }
    // console.log("mail_picker_" + i + ": " + localStorage["mail_picker_" + i]);
  }

  for (i = 0; i <= mailOptionsLength; i += 1) {
    if (chromeLocalStorage[`new_window_${i}`]) {
      mailOptions[`new_window_${i}`] = chromeLocalStorage[`new_window_${i}`];
    } else {
      // if not set, leave as off
      mailOptions[`new_window_${i}`] = 'false';
      // console.log("new_window_" + i + " not found");
    }
    // console.log("new_window_" + i + ": " + localStorage["new_window_" + i]);
  }

  if (chromeLocalStorage.mail_to) {
    mailOptions.mail_to = chromeLocalStorage.mail_to;
  } else {
    // default
    mailOptions.mail_to = '';
  }

  // email body
  if (chromeLocalStorage.mail_before) {
    mailOptions.mail_before = chromeLocalStorage.mail_before;
  } else {
    // default
    mailOptions.mail_before = '';
  }
  if (chromeLocalStorage.mail_after) {
    mailOptions.mail_after = chromeLocalStorage.mail_after;
  } else {
    // default
    mailOptions.mail_after = '';
  }

  // email body new lines
  if (chromeLocalStorage.newLineAfter) {
    mailOptions.newLineAfter = chromeLocalStorage.newLineAfter;
  } else {
    // default
    mailOptions.newLineAfter = false;
  }
  if (chromeLocalStorage.newLineAfterNum) {
    mailOptions.newLineAfterNum = chromeLocalStorage.newLineAfterNum;
  } else {
    // default
    mailOptions.newLineAfterNum = 1;
  }
  if (chromeLocalStorage.newLineBefore) {
    mailOptions.newLineBefore = chromeLocalStorage.newLineBefore;
  } else {
    // default
    mailOptions.newLineBefore = false;
  }
  if (chromeLocalStorage.newLineBeforeNum) {
    mailOptions.newLineBeforeNum = chromeLocalStorage.newLineBeforeNum;
  } else {
    // default
    mailOptions.newLineBeforeNum = 1;
  }

  return mailOptions;
}

function saveDefaultOptionsFn() {
  let i;

  chromeLocalStorage.mail_before = '';
  chromeLocalStorage.mail_after = '';
  chromeLocalStorage.mail_to = '';
  chromeLocalStorage.newLineAfter = false;
  chromeLocalStorage.newLineAfterNum = 1;
  chromeLocalStorage.newLineBefore = false;
  chromeLocalStorage.newLineBeforeNum = 1;

  const { mailOptionsLength } = chromeLocalStorage;
  for (i = 0; i <= mailOptionsLength; i += 1) {
    chromeLocalStorage[`mail_picker_${i}`] = true;
  }
  for (i = 0; i <= mailOptionsLength; i += 1) {
    chromeLocalStorage[`new_window_${i}`] = false;
  }
}

// Count how many mail options are enabled
function getOptionsShownCountFn() {
  // get saved values
  const mailOptions = getOptionsFn();
  const { mailOptionsLength } = chromeLocalStorage;
  let mailtype;
  let optionsShownCount;
  let i;

  optionsShownCount = 0;

  // Hide options not selected
  for (i = 0; i <= mailOptionsLength; i += 1) {
    mailtype = mailOptions[`mail_picker_${i}`];
    if (mailtype === 'true') {
      optionsShownCount += 1;
    }
  }

  return optionsShownCount;
}

// Get the currently enabled mail option
function getSingleOptionIntFn() {
  // get saved values
  const mailOptions = getOptionsFn();
  const { mailOptionsLength } = chromeLocalStorage;
  let mailtype;
  let optionInt;
  let i;

  // Hide options not selected
  for (i = 0; i <= mailOptionsLength; i += 1) {
    mailtype = mailOptions[`mail_picker_${i}`];
    if (mailtype === 'true') {
      optionInt = i;
    }
  }

  return optionInt;
}

export const getOptions = getOptionsFn;
export const saveDefaultOptions = saveDefaultOptionsFn;
export const getOptionsShownCount = getOptionsShownCountFn;
export const getSingleOptionInt = getSingleOptionIntFn;
