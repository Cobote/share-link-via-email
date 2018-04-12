/* global chrome */
// Common functions used by the extension

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

// toggle new window checkbox when mail sender is unchecked
function toggleNewWindowChbox() {
  const { mailOptionsLength } = localStorage;
  let child;
  let i;

  for (i = 1; i <= mailOptionsLength; i += 1) {
    child = localStorage[`mail_picker_${i}`];
    if (child === 'false') {
      document.getElementById(`new_window_${i}`).setAttribute('disabled', 'true');
    } else {
      document.getElementById(`new_window_${i}`).setAttribute('disabled', '');
    }
  }
}

// use the saved values for the form
function restoreOptionsFn() {
  // get saved values
  let mailOptions = [];
  const { mailOptionsLength } = localStorage;
  let select;
  let mailtype;
  let i;

  mailOptions = getOptionsFn();

  // Restores check box state
  for (i = 0; i <= mailOptionsLength; i += 1) {
    mailtype = mailOptions[`mail_picker_${i}`];
    select = document.getElementById(`mail_picker_${i}`);
    if (mailtype === 'true') {
      select.setAttribute('checked', true);
    } else {
      select.setAttribute('checked', false);
    }
  }
  for (i = 0; i <= mailOptionsLength; i += 1) {
    mailtype = mailOptions[`new_window_${i}`];
    select = document.getElementById(`new_window_${i}`);
    if (mailtype === 'true') {
      select.setAttribute('checked', true);
    } else {
      select.setAttribute('checked', false);
    }
  }

  const toEmailAdd = mailOptions.mail_to;
  document.getElementById('mail_to').value = toEmailAdd;

  const beforeMsg = mailOptions.mail_before;
  document.getElementById('mail_before').value = beforeMsg;

  const afterMsg = mailOptions.mail_after;
  document.getElementById('mail_after').value = afterMsg;

  const [newLineAfter] = mailOptions;
  select = document.getElementById('newLineAfter');
  if (newLineAfter === 'true') {
    select.setAttribute('checked', true);
    document.getElementById('newLineAfterNum').setAttribute('disabled', '');
  } else {
    document.getElementById('newLineAfterNum').setAttribute('disabled', 'true');
  }

  const [newLineAfterNum] = mailOptions;
  document.getElementById('newLineAfterNum').value = newLineAfterNum;

  const [newLineBefore] = mailOptions;
  select = document.getElementById('newLineBefore');
  if (newLineBefore === 'true') {
    select.setAttribute('checked', true);
    document.getElementById('newLineBeforeNum').setAttribute('disabled', '');
  } else {
    document.getElementById('newLineBeforeNum').setAttribute('disabled', 'true');
  }

  const [newLineBeforeNum] = mailOptions;
  document.getElementById('newLineBeforeNum').value = newLineBeforeNum;

  toggleNewWindowChbox();
}

// use the saved values for the form
function showHideOptionsFn() {
  // get saved values
  const { mailOptionsLength } = localStorage;
  let select;
  let mailtype;
  let i;

  const mailOptions = getOptionsFn();

  // Hide options not selected
  for (i = 0; i <= mailOptionsLength; i += 1) {
    mailtype = mailOptions[`mail_picker_${i}`];
    select = document.getElementById(`mail_picker_${i}`);
    if (mailtype !== 'true') {
      select.style.display = 'none';
    }
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

// Saves options to localStorage.
// only email body section
function saveBodyOptionsFn() {
  const mailTo = document.getElementById('mail_to').value;
  localStorage.mail_to = mailTo;

  const mailBefore = document.getElementById('mail_before').value;
  localStorage.mail_before = mailBefore;

  const mailAfter = document.getElementById('mail_after').value;
  localStorage.mail_after = mailAfter;

  const newLineAfter = document.getElementById('newLineAfter').getAttribute('checked');
  localStorage.newLineAfter = newLineAfter;

  const newLineAfterNum = document.getElementById('newLineAfterNum').value;
  localStorage.newLineAfterNum = newLineAfterNum;

  const newLineBefore = document.getElementById('newLineBefore').getAttribute('checked');
  localStorage.newLineBefore = newLineBefore;

  const newLineBeforeNum = document.getElementById('newLineBeforeNum').value;
  localStorage.newLineBeforeNum = newLineBeforeNum;

  // Update status to let user know options were saved.
  const status = document.getElementById('status');
  const statusCss = 'alert alert-success text-center';
  status.innerHTML = '<strong>Email body settings saved</strong>';
  status.parentElement.classList.add(statusCss);
  status.style.display = 'none';
  // status.parent().slideToggle();
  // TODO: replace slideToggle with something else??
  setTimeout(() => {
    // status.parent().slideToggle(() => {
    //   status.innerHTML = '';
    //   status.parentElement.classList.remove(statusCss);
    // });
    status.innerHTML = '';
    status.parentElement.classList.remove(statusCss);
  }, 3000);

  // reload context menu with new settings
  chrome.contextMenus.removeAll();
  chrome.extension.getBackgroundPage().window.location.reload();
}

// Saves options to localStorage.
// only email sender selection
function saveSenderOptionsFn() {
  const { mailOptionsLength } = localStorage;
  let child;
  let i;

  for (i = 0; i <= mailOptionsLength; i += 1) {
    child = document.getElementById(`mail_picker_${i}`);
    localStorage[`mail_picker_${i}`] = child.getAttribute('checked');
  }

  for (i = 0; i <= mailOptionsLength; i += 1) {
    child = document.getElementById(`new_window_${i}`);
    localStorage[`new_window_${i}`] = child.getAttribute('checked');
  }

  toggleNewWindowChbox();

  // Update status to let user know options were saved.

  // reload context menu with new settings
  chrome.contextMenus.removeAll();
  chrome.extension.getBackgroundPage().window.location.reload();
}

// select/clear all toggle
function changeAllFn(checkbox, element) {
  const { mailOptionsLength } = localStorage;
  let i;

  for (i = 0; i <= mailOptionsLength; i += 1) {
    if (checkbox.getAttribute('checked')) {
      document.getElementById(`${element}_${i}`).setAttribute('checked', true);
    } else {
      document.getElementById(`${element}_${i}`).setAttribute('checked', false);
    }
  }
}

// select/clear all checker
function changeCheckFn(element) {
  let changeChecker = true;
  const { mailOptionsLength } = localStorage;
  let select;
  let i;

  for (i = 1; i <= mailOptionsLength; i += 1) {
    select = document.getElementById(`${element}_${i}`);
    if (!select.getAttribute('checked')) {
      changeChecker = false;
    }
  }

  // set All check value
  select = document.getElementById(`${element}_0`);
  select.setAttribute('checked', changeChecker);
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
function getPreviewFn() {
  // update preview text
  const preview = document.getElementById('previewText');
  let startMessage = document.getElementById('mail_before').value;
  let endMessage = document.getElementById('mail_after').value;
  const newLineAfter = document.getElementById('newLineAfter').getAttribute('checked');
  const newLineAfterNum = document.getElementById('newLineAfterNum').value;
  const newLineBefore = document.getElementById('newLineBefore').getAttribute('checked');
  const newLineBeforeNum = document.getElementById('newLineBeforeNum').value;

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
  preview.innerHTML = previewText;
}

// Create email page option for each context type.
function createContextFn(contextName, oncLink) {
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

function createEmailTabFn(info, tab, mailsrvr, newLineChar, newWindow) {
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

  if (document.getElementById('newLineAfter').getAttribute('checked')) {
    currentItem = document.getElementById('newLineAfterNum');
    if (currentItem.value < 0) {
      // alert("New line before URL needs to be 0 or higher");
      errorFound = true;
    }
    if ((Number.isNaN(currentItem.value) || currentItem.value === '')) {
      // alert("New line before URL is not a number");
      errorFound = true;
    }
  }
  if (document.getElementById('newLineBefore').getAttribute('checked')) {
    currentItem = document.getElementById('newLineBeforeNum');
    if (currentItem.value < 0) {
      // alert("New line after URL needs to be 0 or higher");
      errorFound = true;
    }
    if ((Number.isNaN(currentItem.value) || currentItem.value === '')) {
      // alert("New line after URL is not a number");
      errorFound = true;
    }
  }

  return errorFound;
}

// handle email link
function openEmailHandlerFn(mailPickerInt) {
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

// get link
function getLink(info, tab) {
  let pageUrl;

  if (info.linkUrl) {
    // context if link
    pageUrl = info.linkUrl;
  } else {
    pageUrl = tab.url;
  }
  // pageUrl = encodeURIComponent(pageUrl);
  // console.log("page url: " + pageUrl);
  return pageUrl;
}

// get title
function getTitle(info, tab) {
  let pageTitle;

  if (info.linkUrl) {
    // context if link
    pageTitle = '';
  } else {
    pageTitle = tab.title;
  }
  // console.log("page title: " + pageTitle);
  return pageTitle;
}

export const restoreOptions = restoreOptionsFn;
export const showHideOptions = showHideOptionsFn;
export const getPreview = getPreviewFn;
export const getOptions = getOptionsFn;
export const createEmailTab = createEmailTabFn;
export const createContext = createContextFn;
export const getOptionsShownCount = getOptionsShownCountFn;
export const openEmailHandler = openEmailHandlerFn;
export const getSingleOptionInt = getSingleOptionIntFn;
export const saveBodyOptions = saveBodyOptionsFn;
export const saveSenderOptions = saveSenderOptionsFn;
export const changeAll = changeAllFn;
export const changeCheck = changeCheckFn;
