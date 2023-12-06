/* global chrome */

import { getOptions } from './local_storage';
import { emailLinks } from './email_service_link';

// eslint-disable-next-line no-use-before-define
chrome.contextMenus.onClicked.addListener(handleContextClick);

// Create email page option for each context type.
function createContextItem(contextName, emailLink) {
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
      id: `${context}_${emailLink}`,
    });
  }
}

async function createAllContext() {
  // Get stored options
  const mailOptions = await getOptions();

  const favoriteMailto = mailOptions.mail_picker_1;
  const favoriteGmail = mailOptions.mail_picker_2;
  const favoriteHotmail = mailOptions.mail_picker_3;
  const favoriteOffice365 = mailOptions.mail_picker_7;
  const favoriteYmail = mailOptions.mail_picker_4;
  const favoriteAOL = mailOptions.mail_picker_5;

  // Create email menu option for each context type in this order
  if (favoriteMailto) {
    createContextItem('Email', 'emailLink');
  }
  if (favoriteAOL) {
    createContextItem('AOL Mail', 'aolLink');
  }
  if (favoriteGmail) {
    createContextItem('Gmail', 'gmailLink');
  }
  if (favoriteHotmail) {
    createContextItem('Outlook.com', 'hotmailLink');
  }
  if (favoriteOffice365) {
    createContextItem('Office 365', 'office365Link');
  }
  if (favoriteYmail) {
    createContextItem('Yahoo Mail', 'ymailLink');
  }
}

function handleContextClick(info, tab) {
  const { menuItemId } = info;
  const idSplit = menuItemId.split('_');
  const [, emailLink] = idSplit;

  switch (emailLink) {
    case 'emailLink':
      emailLinks.emailLink(info, tab);
      break;
    case 'aolLink':
      emailLinks.aolLink(info, tab);
      break;
    case 'gmailLink':
      emailLinks.gmailLink(info, tab);
      break;
    case 'hotmailLink':
      emailLinks.hotmailLink(info, tab);
      break;
    case 'office365Link':
      emailLinks.office365Link(info, tab);
      break;
    case 'ymailLink':
      emailLinks.ymailLink(info, tab);
      break;
    default:
      // console.log({ info, tab });
      break;
  }
}

export default createAllContext;
