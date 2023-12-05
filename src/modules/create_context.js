/* global chrome */

import { getOptions } from './local_storage';
import { emailLinks } from './email_service_link';

// Create email page option for each context type.
function createContextItem(contextName, oncLink) {
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

function createAllContext() {
  // Get stored options
  const mailOptions = getOptions();

  const favoriteMailto = mailOptions.mail_picker_1;
  const favoriteGmail = mailOptions.mail_picker_2;
  const favoriteHotmail = mailOptions.mail_picker_3;
  const favoriteOffice365 = mailOptions.mail_picker_7;
  const favoriteYmail = mailOptions.mail_picker_4;
  const favoriteAOL = mailOptions.mail_picker_5;

  // Create email menu option for each context type in this order
  if (favoriteMailto) {
    createContextItem('Email', emailLinks.emailLink);
  }
  if (favoriteAOL) {
    createContextItem('AOL Mail', emailLinks.aolLink);
  }
  if (favoriteGmail) {
    createContextItem('Gmail', emailLinks.gmailLink);
  }
  if (favoriteHotmail) {
    createContextItem('Outlook.com', emailLinks.hotmailLink);
  }
  if (favoriteOffice365) {
    createContextItem('Office 365', emailLinks.office365Link);
  }
  if (favoriteYmail) {
    createContextItem('Yahoo Mail', emailLinks.ymailLink);
  }
}

export default createAllContext;
