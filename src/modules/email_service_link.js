/* global chrome */

import addNewLines from './add_new_lines';
import { getOptions } from './local_storage';

// get title
function getTitle(info, tab) {
  let pageTitle;

  if (info.linkUrl) {
    // context if link
    pageTitle = '';
  } else {
    pageTitle = tab.title;
  }
  return pageTitle;
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
  return pageUrl;
}

async function createEmailMessage(info, tab, mailsrvr, newLineChar) {
  let pageUrl = getLink(info, tab);
  // const pageTitle = getTitle(info, tab);

  // Get stored options
  const mailOptions = await getOptions();
  const { newLineAfter, newLineAfterNum, newLineBefore, newLineBeforeNum } =
    mailOptions;
  const beforeMsg = mailOptions.mail_before;
  const afterMsg = mailOptions.mail_after;

  const newLineAfterBody = addNewLines(
    newLineAfter,
    newLineAfterNum,
    newLineChar
  );
  const newLineBeforeBody = addNewLines(
    newLineBefore,
    newLineBeforeNum,
    newLineChar
  );
  let emailBody = '';
  let beforeMsgEncoded = beforeMsg || '';
  let afterMsgEncoded = afterMsg || '';

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

  // selectionText
  let selectionTextBody = '';
  if (info.selectionText) {
    selectionTextBody = info.selectionText;
    pageUrl = ` From ${pageUrl}`;
  }

  emailBody =
    beforeMsgEncoded +
    newLineAfterBody +
    selectionTextBody +
    pageUrl +
    newLineBeforeBody +
    afterMsgEncoded;
  return emailBody;
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
  if (newWindow) {
    chrome.tabs.create({ url: urlString }); // chrome api method - new tab
  } else {
    chrome.tabs.update({ url: urlString }); // chrome api method - same page
  }
}

// create a new email
async function emailLink(info, tab) {
  const newLineChar = '%0A';

  const mailOptions = await getOptions();
  const newWindow = mailOptions.new_window_1;
  const mailTo = mailOptions.mail_to;

  const mailsrvr = `mailto:${mailTo}?subject=`;
  createEmailTab(info, tab, mailsrvr, newLineChar, newWindow);
}

// create a new Gmail
async function gmailLink(info, tab) {
  const newLineChar = '%0A';

  const mailOptions = await getOptions();
  const newWindow = mailOptions.new_window_2;
  const mailTo = mailOptions.mail_to;

  const mailsrvr = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&=1&to=${mailTo}&su=`;
  createEmailTab(info, tab, mailsrvr, newLineChar, newWindow);
}

// create a new hotmail
async function hotmailLink(info, tab) {
  const newLineChar = '%0A';

  const mailOptions = await getOptions();
  const newWindow = mailOptions.new_window_3;
  const mailTo = mailOptions.mail_to;

  // mailsrvr = 'http://mail.live.com/?rru=compose&to=' + mailTo + '&subject=';
  const mailsrvr = `https://outlook.live.com/owa/?path=/mail/action/compose&to=${mailTo}&subject=`;
  createEmailTab(info, tab, mailsrvr, newLineChar, newWindow);
}

// create a new Office365
async function office365Link(info, tab) {
  const newLineChar = '%0A';

  const mailOptions = await getOptions();
  const newWindow = mailOptions.new_window_7;
  const mailTo = mailOptions.mail_to;

  const mailsrvr = `https://outlook.office.com/owa/?path=/mail/action/compose&to=${mailTo}&subject=`;
  createEmailTab(info, tab, mailsrvr, newLineChar, newWindow);
}

// create a new ymail / yahoo
async function ymailLink(info, tab) {
  const newLineChar = '%0A';

  const mailOptions = await getOptions();
  const newWindow = mailOptions.new_window_4;
  const mailTo = mailOptions.mail_to;

  const mailsrvr = `https://compose.mail.yahoo.com?to=${mailTo}&subject=`;
  // mailsrvr = 'https://us-mg40.mail.yahoo.com/neo/launch?action=compose&to=' + mailTo + '&subj=';
  // const mailsrvr = `https://mail.yahoo.com?to=${mailTo}&subject=`;
  createEmailTab(info, tab, mailsrvr, newLineChar, newWindow);
}

// create a new AOL mail
async function aolLink(info, tab) {
  const newLineChar = '%20'; // using space

  const mailOptions = await getOptions();
  const newWindow = mailOptions.new_window_5;
  const mailTo = mailOptions.mail_to;

  const mailsrvr = `https://mail.aol.com/mail/ComposeMessage.aspx?to=${mailTo}&subject=`;
  createEmailTab(info, tab, mailsrvr, newLineChar, newWindow);
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
      case 3:
        hotmailLink(info, tab);
        break;
      case 7:
        office365Link(info, tab);
        break;
      case 4:
        ymailLink(info, tab);
        break;
      default:
        break;
    }
  });
}

export const emailLinks = {
  emailLink,
  gmailLink,
  hotmailLink,
  office365Link,
  ymailLink,
  aolLink,
};
export const openEmailHandler = openEmailHandlerFn;
