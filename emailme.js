// Creates each of the links to be used by each type of Email client
localStorage['mailOptionsLength'] = 6;

// check for first run
var firstRun = (localStorage['firstRun'] === 'true');
// now save that first run has started
if (!firstRun) {
  localStorage['firstRun'] = 'true';
}  
// check if any settings have been saved
if (!firstRun) { 
    var mailOptionsLength = localStorage['mailOptionsLength'];
    for (var i = 0; i <= mailOptionsLength; i++) {
       if (localStorage["mail_picker_"+i] === 'true' || localStorage["mail_picker_"+i] === 'false' ) {
           firstRun = 'true';
           console.log("Not first time - found save option: localStorage['mail_picker_"+ i +"'] as "+ localStorage["mail_picker_"+i]);
           break;
       }
    }
}
console.log("False if first time: " + firstRun);
// run actions if first run & no settings saved
if (!firstRun) {
  // Set all options to default
  save_default_options();
} 

// Get stored options
mailOptions = new Array();
mailOptions = get_options();


var favoriteMailto = mailOptions["mail_picker_1"];
var favoriteGmail = mailOptions["mail_picker_2"];
var favoriteHotmail = mailOptions["mail_picker_3"];
var favoriteYmail = mailOptions["mail_picker_4"];
var favoriteAOL = mailOptions["mail_picker_5"];
var favoriteInbox = mailOptions["mail_picker_6"];

var newWindowMailto = mailOptions["new_window_1"];
var newWindowGmail = mailOptions["new_window_2"];
var newWindowHotmail = mailOptions["new_window_3"];
var newWindowYmail = mailOptions["new_window_4"];
var newWindowAOL = mailOptions["new_window_5"];
var newWindowInbox = mailOptions["new_window_6"];

var toEmailAdd = mailOptions["mail_to"];

var beforeMsg = mailOptions["mail_before"];
console.log("before message: " + beforeMsg);

var afterMsg = mailOptions["mail_after"];
console.log("after message: " + afterMsg);

var newLineAfter = mailOptions["newLineAfter"];
var newLineAfterNum = mailOptions["newLineAfterNum"];
var newLineBefore = mailOptions["newLineBefore"];
var newLineBeforeNum = mailOptions["newLineBeforeNum"];

var context;
var title;
var id;

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

// get link
function getLink(info, tab) {
  if (info.linkUrl) {
	// context if link
	pageUrl = info.linkUrl;
  } else {
	pageUrl = tab.url;
  }
  //pageUrl = encodeURIComponent(pageUrl);
  console.log("page url: " + pageUrl);
  return pageUrl;
}

// get title
function getTitle(info, tab) {
  if (info.linkUrl) {
	// context if link
	pageTitle = '';
  } else {
	pageTitle = tab.title;
  }
  console.log("page title: " + pageTitle);
  return pageTitle;
}

// create a new email
function emailLink(info, tab) {
    var mailsrvr = '';
    var newLineChar = '%0A';
    var newWindow = newWindowMailto;
    var mailTo = toEmailAdd;
    
    mailsrvr = 'mailto:' + mailTo + '?Subject=';    
    createEmailTab(info, tab, mailsrvr, newLineChar, newWindow);
}

// create a new Gmail
function gmailLink(info, tab) {
    var mailsrvr = '';
    var newLineChar = '%0A';
    var newWindow = newWindowGmail;
    var mailTo = toEmailAdd;
    
    mailsrvr = 'https://mail.google.com/mail/?view=cm&fs=1&tf=1&=1&to=' + mailTo + '&su=';
    createEmailTab(info, tab, mailsrvr, newLineChar, newWindow);
}

// create a new hotmail
function hotmailLink(info, tab) {
    var mailsrvr = '';
    var newLineChar = '%0A';
    var newWindow = newWindowHotmail;
    var mailTo = toEmailAdd;
    
    mailsrvr = 'http://mail.live.com/?rru=compose&to=' + mailTo + '&subject=';
    createEmailTab(info, tab, mailsrvr, newLineChar, newWindow);
}

// create a new ymail
function ymailLink(info, tab) {
    var mailsrvr = '';
    var newLineChar = '%0A';
    var newWindow = newWindowYmail;
    var mailTo = toEmailAdd;
    
    mailsrvr = 'http://compose.mail.yahoo.com?to=' + mailTo + '&subject=';
    //mailsrvr = 'https://us-mg40.mail.yahoo.com/neo/launch?action=compose&to=' + mailTo + '&subj=';
    createEmailTab(info, tab, mailsrvr, newLineChar, newWindow);
}

// create a new AOL mail
function aolLink(info, tab) {
    var mailsrvr = '';
    var newLineChar = '%20'; //using space
    var newWindow = newWindowAOL;
    var mailTo = toEmailAdd;
    
    mailsrvr = 'https://mail.aol.com/mail/ComposeMessage.aspx?to=' + mailTo + '&subject=';
    createEmailTab(info, tab, mailsrvr, newLineChar, newWindow);
}

// create a new Inbox
function inboxLink(info, tab) {
    var mailsrvr = '';
    var newLineChar = '%0A';
    var newWindow = newWindowInbox;
    var mailTo = toEmailAdd;
	
	mailsrvr = 'https://inbox.google.com/u/0/?to=' + mailTo + '&subject=';
    createEmailTab(info, tab, mailsrvr, newLineChar, newWindow);
}