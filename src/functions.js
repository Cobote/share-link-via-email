/* global chrome */
// Common functions used by the extension

// Restores saved values from localStorage.
// if none saved, use default values
function getOptions() {
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

// use the saved values for the form
function restoreOptions() {
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
    select = $(`mail_picker_${i}`);
    if (mailtype === 'true') {
      select.prop('checked', true);
    } else {
      select.prop('checked', false);
    }
  }
  for (i = 0; i <= mailOptionsLength; i += 1) {
    mailtype = mailOptions[`new_window_${i}`];
    select = $(`#new_window_${i}`);
    if (mailtype === 'true') {
      select.prop('checked', true);
    } else {
      select.prop('checked', false);
    }
  }

  const toEmailAdd = mailOptions.mail_to;
  $('#mail_to').val(toEmailAdd);

  const beforeMsg = mailOptions.mail_before;
  $('#mail_before').val(beforeMsg);

  const afterMsg = mailOptions.mail_after;
  $('#mail_after').val(afterMsg);

  const [newLineAfter] = mailOptions;
  select = $('#newLineAfter');
  if (newLineAfter === 'true') {
    select.prop('checked', true);
    $('#newLineAfterNum').prop('disabled', false);
  } else {
    $('#newLineAfterNum').prop('disabled', true);
  }

  const [newLineAfterNum] = mailOptions;
  $('#newLineAfterNum').val(newLineAfterNum);

  const [newLineBefore] = mailOptions;
  select = $('#newLineBefore');
  if (newLineBefore === 'true') {
    select.prop('checked', true);
    $('#newLineBeforeNum').prop('disabled', false);
  } else {
    $('#newLineBeforeNum').prop('disabled', true);
  }

  const [newLineBeforeNum] = mailOptions;
  $('#newLineBeforeNum').val(newLineBeforeNum);

  toggle_newWindow_chbox();
}

// use the saved values for the form
function showHideOptions() {
  // get saved values
  const { mailOptionsLength } = localStorage;
  let select;
  let mailtype;
  let i;

  const mailOptions = getOptions();

  // Hide options not selected
  for (i = 0; i <= mailOptionsLength; i += 1) {
    mailtype = mailOptions[`mail_picker_${i}`];
    select = $(`#mail_picker_${i}`);
    if (mailtype !== 'true') {
      select.hide();
    }
  }
}

// Count how many mail options are enabled
function getOptionsShownCount() {
  // get saved values
  const mailOptions = getOptions();
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
function getSingleOptionInt() {
  // get saved values
  const mailOptions = getOptions();
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

// Saves options to localStorage.
// only email body section
function saveBodyOptions() {
  const mailTo = $('#mail_to').val();
  localStorage.mail_to = mailTo;

  const mailBefore = $('#mail_before').val();
  localStorage.mail_before = mailBefore;

  const mailAfter = $('#mail_after').val();
  localStorage.mail_after = mailAfter;

  const newLineAfter = $('#newLineAfter').prop('checked');
  localStorage.newLineAfter = newLineAfter;

  const newLineAfterNum = $('#newLineAfterNum').val();
  localStorage.newLineAfterNum = newLineAfterNum;

  const newLineBefore = $('#newLineBefore').prop('checked');
  localStorage.newLineBefore = newLineBefore;

  const newLineBeforeNum = $('#newLineBeforeNum').val();
  localStorage.newLineBeforeNum = newLineBeforeNum;

  // Update status to let user know options were saved.
  const status = $('#status');
  const statusCss = 'alert alert-success text-center';
  status.html('<strong>Email body settings saved</strong>');
  status.parent().addClass(statusCss);
  status.parent().hide();
  status.parent().slideToggle();
  setTimeout(() => {
    status.parent().slideToggle(() => {
      status.html('');
      status.parent().removeClass(statusCss);
    });
  }, 3000);

  // reload context menu with new settings
  chrome.contextMenus.removeAll();
  chrome.extension.getBackgroundPage().window.location.reload();
}

// Saves options to localStorage.
// only email sender selection
function saveSenderOptions() {
  const { mailOptionsLength } = localStorage;
  let child;
  let i;

  for (i = 0; i <= mailOptionsLength; i += 1) {
    child = $(`#mail_picker_${i}`);
    localStorage[`mail_picker_${i}`] = child.prop('checked');
  }

  for (i = 0; i <= mailOptionsLength; i += 1) {
    child = $(`#new_window_${i}`);
    localStorage[`new_window_${i}`] = child.prop('checked');
  }

  toggle_newWindow_chbox();

  // Update status to let user know options were saved.

  // reload context menu with new settings
  chrome.contextMenus.removeAll();
  chrome.extension.getBackgroundPage().window.location.reload();
}

// select/clear all toggle
function changeAll(checkbox, element) {
  const { mailOptionsLength } = localStorage;
  let i;

  for (i = 0; i <= mailOptionsLength; i += 1) {
    if ($(checkbox).prop('checked')) {
      $(`#${element}_${i}`).prop('checked', true);
    } else {
      $(`#${element}_${i}`).prop('checked', false);
    }
  }
}

// select/clear all checker
function changeCheck(element) {
  let changeChecker = true;
  const { mailOptionsLength } = localStorage;
  let select;
  let i;

  for (i = 1; i <= mailOptionsLength; i += 1) {
    select = $(`#${element}_${i}`);
    if (!select.prop('checked')) {
      changeChecker = false;
    }
  }

  // set All check value
  select = $(`#${element}_0`);
  select.prop('checked', changeChecker);
}

function addNewLines(linesEnabled, lineCount, breakChar) {
  // add new lines
  let lineString = '';
  let i;

  if ((linesEnabled !== false && linesEnabled !== 'false') && lineCount >= 1) {
    for (i = 0; i < lineCount; i += 1) {
      lineString += breakChar;
      // lineString = lineString + "<br/>";
      // varName = varName + '%0A';
    }
  } else {
    lineString = '';
  }

  return lineString;
}

// update preview
function getPreview() {
  // update preview text
  const preview = $('#previewText');
  let startMessage = $('#mail_before').val();
  let endMessage = $('#mail_after').val();
  const newLineAfter = $('#newLineAfter').prop('checked');
  const newLineAfterNum = $('#newLineAfterNum').val();
  const newLineBefore = $('#newLineBefore').prop('checked');
  const newLineBeforeNum = $('#newLineBeforeNum').val();

  let previewText = '';
  const exampleAddress = 'http://www.google.com';

  // get new line string
  const newLineAfterBody = addNewLines(newLineAfter, newLineAfterNum, '<br/>');
  const newLineBeforeBody = addNewLines(newLineBefore, newLineBeforeNum, '<br/>');

  if (startMessage !== '' && newLineAfterBody === '') {
    startMessage += ' ';
  }
  if (endMessage !== '' && newLineBeforeBody === '') {
    endMessage = ` ${endMessage}`;
  }

  // set preview text
  previewText = startMessage + newLineAfterBody + exampleAddress + newLineBeforeBody + endMessage;

  // send preview to display
  preview.html(previewText);
}

// Create email page option for each context type.
function createContext(contextName, oncLink) {
  const contexts = ['page', 'link', 'selection'];
  let context;
  let title;
  let i;

  for (i = 0; i < contexts.length; i += 1) {
    context = contexts[i];
    title = `Send ${context} via ${contextName}`;
    chrome.contextMenus.create({
      title,
      contexts: [context],
      onclick: oncLink,
    });
    // console.log("added '" + context + "' for " + contextName);
  }
}

function saveDefaultOptions() {
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

function createEmailTab(info, tab, mailsrvr, newLineChar, newWindow) {
  let emailBody = '';
  let urlString = '';
  // const pageUrl = getLink(info, tab);
  let pageTitle = getTitle(info, tab);

  // pageUrl = encodeURIComponent(pageUrl);
  pageTitle = encodeURIComponent(pageTitle);

  emailBody = createEmailMessage(info, tab, mailsrvr, newLineChar);

  urlString = `${mailsrvr}${pageTitle}&body=${emailBody}`;

  // open link in new tab
  // window.open(mailsrvr+pageTitle+'&body='+emailBody); // JS method
  if (newWindow === 'true') {
    chrome.tabs.create({ url: urlString }); // chrome api method - new tab
  } else {
    chrome.tabs.update({ url: urlString });  // chrome api method - same page
  }

  // write log of items used for the URL
  // console.log("link " + pageUrl + " - " + pageTitle + " was sent");
  // console.log("item " + info.menuItemId + " was clicked");
  // console.log("info: " + JSON.stringify(info));
  // console.log("tab: " + JSON.stringify(tab));
}

function createEmailMessage(info, tab, mailsrvr, newLineChar) {
  let pageUrl = getLink(info, tab);
  // const pageTitle = getTitle(info, tab);
  const newLineAfterBody = addNewLines(newLineAfter, newLineAfterNum, newLineChar);
  const newLineBeforeBody = addNewLines(newLineBefore, newLineBeforeNum, newLineChar);
  let emailBody = '';
  let beforeMsgEncoded = beforeMsg;
  let afterMsgEncoded = afterMsg;

  pageUrl = encodeURIComponent(pageUrl);
  // pageTitle = encodeURIComponent(pageTitle);

  if (beforeMsgEncoded !== '' && newLineAfterBody === '') {
    beforeMsgEncoded += ' ';
  }
  beforeMsgEncoded = encodeURIComponent(beforeMsgEncoded);

  if (afterMsgEncoded !== '' && newLineBeforeBody === '') {
    afterMsgEncoded = ` ${afterMsgEncoded}`;
  }
  afterMsgEncoded = encodeURIComponent(afterMsgEncoded);


  emailBody = beforeMsgEncoded + newLineAfterBody + pageUrl + newLineBeforeBody + afterMsgEncoded;
  return emailBody;
}

// only email body section
function validateBodyOptions() {
  let errorFound = false;
  let currentItem;

  if ($('#newLineAfter').prop('checked')) {
    currentItem = $('#newLineAfterNum');
    if (currentItem.val() < 0) {
      // alert("New line before URL needs to be 0 or higher");
      errorFound = true;
    }
    if ((Number.isNaN(currentItem.val()) || currentItem.val() === '')) {
      // alert("New line before URL is not a number");
      errorFound = true;
    }
  }
  if ($('#newLineBefore').prop('checked')) {
    currentItem = $('#newLineBeforeNum');
    if (currentItem.val() < 0) {
      // alert("New line after URL needs to be 0 or higher");
      errorFound = true;
    }
    if ((Number.isNaN(currentItem.val()) || currentItem.val() === '')) {
      // alert("New line after URL is not a number");
      errorFound = true;
    }
  }

  return errorFound;
}

// toggle new window checkbox when mail sender is unchecked
function toggleNewWindowChbox() {
  const { mailOptionsLength } = localStorage;
  let child;
  let i;

  for (i = 1; i <= mailOptionsLength; i += 1) {
    child = localStorage[`mail_picker_${i}`];
    if (child === 'false') {
      $(`#new_window_ ${i}`).prop('disabled', true);
    } else {
      $(`#new_window_${i}`).prop('disabled', false);
    }
  }
}

// handle email link
function openEmailHandler(mailPickerInt) {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    const tab = tabs[0];
    const info = '';

    switch (mailPickerInt) {
      case 1:
        emailLink(info, tab);
        break;
      case 5:
        aolLink(info, tab);
        break;
      case 2:
        gmailLink(info, tab);
        break;
      case 6:
        inboxLink(info, tab);
        break;
      case 3:
        hotmailLink(info, tab);
        break;
      case 4:
        ymailLink(info, tab);
        break;
      default:
        break;
    }
  });
}

export const restoreOptionsFn = restoreOptions;
export const showHideOptionsFn = showHideOptions;
export const getPreviewFn = getPreview;
