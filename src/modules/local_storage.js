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

export const getOptions = getOptionsFn;
