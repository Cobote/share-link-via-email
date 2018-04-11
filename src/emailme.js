/* global chrome */

import '../images/stock_mail.png';
import { saveDefaultOptions, getOptions, createEmailTab, createContext, getOptionsShownCount, openEmailHandler, getSingleOptionInt } from './functions';

// Creates each of the links to be used by each type of Email client
localStorage.mailOptionsLength = 6;

// check for first run
let firstRun = (localStorage.firstRun === 'true');
// now save that first run has started
if (!firstRun) {
  localStorage.firstRun = 'true';
}
// check if any settings have been saved
if (!firstRun) {
  const { mailOptionsLength } = localStorage;
  let i;

  for (i = 0; i <= mailOptionsLength; i += 1) {
    if (localStorage[`mail_picker_${i}`] === 'true' || localStorage[`mail_picker_${i}`] === 'false') {
      firstRun = 'true';
      // console.log("Not first time - found save option: localStorage['mail_picker_"+ i +"']
      // as "+ localStorage["mail_picker_"+i]);
      break;
    }
  }
}
// console.log("False if first time: " + firstRun);
// run actions if first run & no settings saved
if (!firstRun) {
  // Set all options to default
  saveDefaultOptions();
}

// Get stored options
const mailOptions = getOptions();


const favoriteMailto = mailOptions.mail_picker_1;
const favoriteGmail = mailOptions.mail_picker_2;
const favoriteHotmail = mailOptions.mail_picker_3;
const favoriteYmail = mailOptions.mail_picker_4;
const favoriteAOL = mailOptions.mail_picker_5;
const favoriteInbox = mailOptions.mail_picker_6;

const newWindowMailto = mailOptions.new_window_1;
const newWindowGmail = mailOptions.new_window_2;
const newWindowHotmail = mailOptions.new_window_3;
const newWindowYmail = mailOptions.new_window_4;
const newWindowAOL = mailOptions.new_window_5;
const newWindowInbox = mailOptions.new_window_6;

const toEmailAdd = mailOptions.mail_to;

// const beforeMsg = mailOptions.mail_before;
// console.log("before message: " + beforeMsg);

// const afterMsg = mailOptions.mail_after;
// console.log("after message: " + afterMsg);

// const [newLineAfter] = mailOptions;
// const [newLineAfterNum] = mailOptions;
// const [newLineBefore] = mailOptions;
// const [newLineBeforeNum] = mailOptions;

// let context;
// let title;
// let id;

// create a new email
function emailLink(info, tab) {
  const newLineChar = '%0A';
  const newWindow = newWindowMailto;
  const mailTo = toEmailAdd;

  const mailsrvr = `mailto:${mailTo}?Subject=`;
  createEmailTab(info, tab, mailsrvr, newLineChar, newWindow);
}

// create a new Gmail
function gmailLink(info, tab) {
  const newLineChar = '%0A';
  const newWindow = newWindowGmail;
  const mailTo = toEmailAdd;

  const mailsrvr = `https://mail.google.com/mail/?view=cm&fs=1&tf=1&=1&to=${mailTo}&su=`;
  createEmailTab(info, tab, mailsrvr, newLineChar, newWindow);
}

// create a new hotmail
function hotmailLink(info, tab) {
  const newLineChar = '%0A';
  const newWindow = newWindowHotmail;
  const mailTo = toEmailAdd;

  // mailsrvr = 'http://mail.live.com/?rru=compose&to=' + mailTo + '&subject=';
  const mailsrvr = `https://outlook.live.com/owa/?path=/mail/action/compose&to=${mailTo}&subject=`;
  createEmailTab(info, tab, mailsrvr, newLineChar, newWindow);
}

// create a new ymail
function ymailLink(info, tab) {
  const newLineChar = '%0A';
  const newWindow = newWindowYmail;
  const mailTo = toEmailAdd;

  const mailsrvr = `http://compose.mail.yahoo.com?to=${mailTo}&subject=`;
  // mailsrvr = 'https://us-mg40.mail.yahoo.com/neo/launch?action=compose&to=' + mailTo + '&subj=';
  createEmailTab(info, tab, mailsrvr, newLineChar, newWindow);
}

// create a new AOL mail
function aolLink(info, tab) {
  const newLineChar = '%20'; // using space
  const newWindow = newWindowAOL;
  const mailTo = toEmailAdd;

  const mailsrvr = `https://mail.aol.com/mail/ComposeMessage.aspx?to=${mailTo}&subject=`;
  createEmailTab(info, tab, mailsrvr, newLineChar, newWindow);
}

// create a new Inbox
function inboxLink(info, tab) {
  const newLineChar = '%0A';
  const newWindow = newWindowInbox;
  const mailTo = toEmailAdd;

  const mailsrvr = `https://inbox.google.com/u/0/?to=${mailTo}&subject=`;
  createEmailTab(info, tab, mailsrvr, newLineChar, newWindow);
}

// Create email menu option for each context type in this order
if (favoriteMailto === 'true') {
  createContext('Email', emailLink);
}
if (favoriteAOL === 'true') {
  createContext('AOL Mail', aolLink);
}
if (favoriteGmail === 'true') {
  createContext('Gmail', gmailLink);
}
if (favoriteInbox === 'true') {
  createContext('Inbox', inboxLink);
}
if (favoriteHotmail === 'true') {
  createContext('Outlook.com', hotmailLink);
}
if (favoriteYmail === 'true') {
  createContext('Yahoo! Mail', ymailLink);
}

// Check if only one option selected
if (getOptionsShownCount() === 1) {
  chrome.browserAction.setPopup({ popup: '' });
  chrome.browserAction.onClicked.addListener(() => {
    openEmailHandler(getSingleOptionInt());
  });
} else {
  chrome.browserAction.setPopup({ popup: 'popup.html' });
}
