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
  // console.log("page title: " + pageTitle);
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
  // pageUrl = encodeURIComponent(pageUrl);
  // console.log("page url: " + pageUrl);
  return pageUrl;
}

function createEmailMessage(info, tab, mailsrvr, newLineChar) {
  let pageUrl = getLink(info, tab);
  // const pageTitle = getTitle(info, tab);

  // Get stored options
  const mailOptions = getOptions();
  const [
    newLineAfter,
    newLineAfterNum,
    newLineBefore,
    newLineBeforeNum,
    beforeMsg,
    afterMsg,
  ] = mailOptions;

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
    chrome.tabs.update({ url: urlString }); // chrome api method - same page
  }

  // write log of items used for the URL
  // console.log("link " + pageUrl + " - " + pageTitle + " was sent");
  // console.log("item " + info.menuItemId + " was clicked");
  // console.log("info: " + JSON.stringify(info));
  // console.log("tab: " + JSON.stringify(tab));
}

// create a new email
function emailLink(info, tab) {
  const newLineChar = '%0A';

  const mailOptions = getOptions();
  const newWindow = mailOptions.new_window_1;
  const mailTo = mailOptions.mail_to;

  const mailsrvr = `mailto:${mailTo}?Subject=`;
  createEmailTab(info, tab, mailsrvr, newLineChar, newWindow);
}

// create a new Gmail
function gmailLink(info, tab) {
  const newLineChar = '%0A';

  const mailOptions = getOptions();
  const newWindow = mailOptions.new_window_2;
  const mailTo = mailOptions.mail_to;

  const mailsrvr = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&=1&to=${mailTo}&su=`;
  createEmailTab(info, tab, mailsrvr, newLineChar, newWindow);
}

// create a new hotmail
function hotmailLink(info, tab) {
  const newLineChar = '%0A';

  const mailOptions = getOptions();
  const newWindow = mailOptions.new_window_3;
  const mailTo = mailOptions.mail_to;

  // mailsrvr = 'http://mail.live.com/?rru=compose&to=' + mailTo + '&subject=';
  const mailsrvr = `https://outlook.live.com/owa/?path=/mail/action/compose&to=${mailTo}&subject=`;
  createEmailTab(info, tab, mailsrvr, newLineChar, newWindow);
}

// create a new ymail
function ymailLink(info, tab) {
  const newLineChar = '%0A';

  const mailOptions = getOptions();
  const newWindow = mailOptions.new_window_4;
  const mailTo = mailOptions.mail_to;

  const mailsrvr = `http://compose.mail.yahoo.com?to=${mailTo}&subject=`;
  // mailsrvr = 'https://us-mg40.mail.yahoo.com/neo/launch?action=compose&to=' + mailTo + '&subj=';
  createEmailTab(info, tab, mailsrvr, newLineChar, newWindow);
}

// create a new AOL mail
function aolLink(info, tab) {
  const newLineChar = '%20'; // using space

  const mailOptions = getOptions();
  const newWindow = mailOptions.new_window_5;
  const mailTo = mailOptions.mail_to;

  const mailsrvr = `https://mail.aol.com/mail/ComposeMessage.aspx?to=${mailTo}&subject=`;
  createEmailTab(info, tab, mailsrvr, newLineChar, newWindow);
}

// create a new Inbox
function inboxLink(info, tab) {
  const newLineChar = '%0A';

  const mailOptions = getOptions();
  const newWindow = mailOptions.new_window_6;
  const mailTo = mailOptions.mail_to;

  const mailsrvr = `https://inbox.google.com/u/0/?to=${mailTo}&subject=`;
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

export const emailLinks = {
  emailLink,
  gmailLink,
  hotmailLink,
  ymailLink,
  aolLink,
  inboxLink,
};
export const openEmailHandler = openEmailHandlerFn;
