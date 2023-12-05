/* global chrome */

export async function getValueFromLocalStorage(name) {
  const objValue = await chrome.storage.local.get([name]);
  return objValue[name];
}

// Restores saved values from localStorage.
// if none saved, use default values
async function getOptionsFn() {
  const mailOptions = {};
  const mailOptionsLength = await getValueFromLocalStorage('mailOptionsLength');
  let i;

  // Restores each mail type
  for (i = 0; i <= mailOptionsLength; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const mailPicker = await getValueFromLocalStorage(`mail_picker_${i}`);
    if (mailPicker) {
      mailOptions[`mail_picker_${i}`] = mailPicker;
    } else {
      // if not set, leave as off
      mailOptions[`mail_picker_${i}`] = 'false';
      // console.log("mail_picker_" + i + " not found");
    }
    // console.log("mail_picker_" + i + ": " + localStorage["mail_picker_" + i]);
  }

  for (i = 0; i <= mailOptionsLength; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const newWindow = await getValueFromLocalStorage(`new_window_${i}`);
    if (newWindow) {
      mailOptions[`new_window_${i}`] = newWindow;
    } else {
      // if not set, leave as off
      mailOptions[`new_window_${i}`] = 'false';
      // console.log("new_window_" + i + " not found");
    }
    // console.log("new_window_" + i + ": " + localStorage["new_window_" + i]);
  }

  const mailTo = await getValueFromLocalStorage('mail_to');
  if (mailTo) {
    mailOptions.mail_to = mailTo;
  } else {
    // default
    mailOptions.mail_to = '';
  }

  // email body
  const mailBefore = await getValueFromLocalStorage('mail_before');
  if (mailBefore) {
    mailOptions.mail_before = mailBefore;
  } else {
    // default
    mailOptions.mail_before = '';
  }
  const mailAfter = await getValueFromLocalStorage('mail_after');
  if (mailAfter) {
    mailOptions.mail_after = mailAfter;
  } else {
    // default
    mailOptions.mail_after = '';
  }

  // email body new lines
  const newLineAfter = await getValueFromLocalStorage('newLineAfter');
  if (newLineAfter) {
    mailOptions.newLineAfter = newLineAfter;
  } else {
    // default
    mailOptions.newLineAfter = false;
  }
  const newLineAfterNum = await getValueFromLocalStorage('newLineAfterNum');
  if (newLineAfterNum) {
    mailOptions.newLineAfterNum = newLineAfterNum;
  } else {
    // default
    mailOptions.newLineAfterNum = 1;
  }
  const newLineBefore = await getValueFromLocalStorage('newLineBefore');
  if (newLineBefore) {
    mailOptions.newLineBefore = newLineBefore;
  } else {
    // default
    mailOptions.newLineBefore = false;
  }
  const newLineBeforeNum = await getValueFromLocalStorage('newLineBeforeNum');
  if (newLineBeforeNum) {
    mailOptions.newLineBeforeNum = newLineBeforeNum;
  } else {
    // default
    mailOptions.newLineBeforeNum = 1;
  }

  return mailOptions;
}

async function saveDefaultOptionsFn() {
  let i;

  const defaults = {
    mail_before: '',
    mail_after: '',
    mail_to: '',
    newLineAfter: false,
    newLineAfterNum: 1,
    ewLineBefore: false,
    newLineBeforeNum: 1,
  };

  const mailOptionsLength = await getValueFromLocalStorage('mailOptionsLength');
  for (i = 0; i <= mailOptionsLength; i += 1) {
    defaults[`mail_picker_${i}`] = true;
  }
  for (i = 0; i <= mailOptionsLength; i += 1) {
    defaults[`new_window_${i}`] = false;
  }

  await chrome.storage.local.set(defaults);
}

// Count how many mail options are enabled
async function getOptionsShownCountFn() {
  // get saved values
  const mailOptions = getOptionsFn();
  const mailOptionsLength = await getValueFromLocalStorage('mailOptionsLength');
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
async function getSingleOptionIntFn() {
  // get saved values
  const mailOptions = getOptionsFn();
  const mailOptionsLength = await getValueFromLocalStorage('mailOptionsLength');
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
