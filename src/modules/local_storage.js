// Restores saved values from localStorage.
// if none saved, use default values
function getOptionsFn() {
  const mailOptions = [];
  const { mailOptionsLength } = localStorage;
  let i;

  // Restores each mail type
  for (i = 0; i <= mailOptionsLength; i += 1) {
    if (localStorage[`mail_picker_${i}`]) {
      mailOptions[`mail_picker_${i}`] = localStorage[`mail_picker_${i}`];
    } else {
      // if not set, leave as off
      mailOptions[`mail_picker_${i}`] = 'false';
      // console.log("mail_picker_" + i + " not found");
    }
    // console.log("mail_picker_" + i + ": " + localStorage["mail_picker_" + i]);
  }

  for (i = 0; i <= mailOptionsLength; i += 1) {
    if (localStorage[`new_window_${i}`]) {
      mailOptions[`new_window_${i}`] = localStorage[`new_window_${i}`];
    } else {
      // if not set, leave as off
      mailOptions[`new_window_${i}`] = 'false';
      // console.log("new_window_" + i + " not found");
    }
    // console.log("new_window_" + i + ": " + localStorage["new_window_" + i]);
  }

  if (localStorage.mail_to) {
    mailOptions.mail_to = localStorage.mail_to;
  } else {
    // default
    mailOptions.mail_to = '';
  }

  // email body
  if (localStorage.mail_before) {
    mailOptions.mail_before = localStorage.mail_before;
  } else {
    // default
    mailOptions.mail_before = '';
  }
  if (localStorage.mail_after) {
    mailOptions.mail_after = localStorage.mail_after;
  } else {
    // default
    mailOptions.mail_after = '';
  }

  // email body new lines
  if (localStorage.newLineAfter) {
    mailOptions.newLineAfter = localStorage.newLineAfter;
  } else {
    // default
    mailOptions.newLineAfter = false;
  }
  if (localStorage.newLineAfterNum) {
    mailOptions.newLineAfterNum = localStorage.newLineAfterNum;
  } else {
    // default
    mailOptions.newLineAfterNum = 1;
  }
  if (localStorage.newLineBefore) {
    mailOptions.newLineBefore = localStorage.newLineBefore;
  } else {
    // default
    mailOptions.newLineBefore = false;
  }
  if (localStorage.newLineBeforeNum) {
    mailOptions.newLineBeforeNum = localStorage.newLineBeforeNum;
  } else {
    // default
    mailOptions.newLineBeforeNum = 1;
  }

  return mailOptions;
}

function saveDefaultOptionsFn() {
  let i;

  localStorage.mail_before = '';
  localStorage.mail_after = '';
  localStorage.mail_to = '';
  localStorage.newLineAfter = false;
  localStorage.newLineAfterNum = 1;
  localStorage.newLineBefore = false;
  localStorage.newLineBeforeNum = 1;

  const { mailOptionsLength } = localStorage;
  for (i = 0; i <= mailOptionsLength; i += 1) {
    localStorage[`mail_picker_${i}`] = true;
  }
  for (i = 0; i <= mailOptionsLength; i += 1) {
    localStorage[`new_window_${i}`] = false;
  }
}

// Count how many mail options are enabled
function getOptionsShownCountFn() {
  // get saved values
  const mailOptions = getOptionsFn();
  const { mailOptionsLength } = localStorage;
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
  const { mailOptionsLength } = localStorage;
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
