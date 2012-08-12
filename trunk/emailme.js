// This is mine, but I used the web for help, so some bits might not be

// check for first run
var firstRun = (localStorage['firstRun'] == 'true');
// now save that first run has started
if (!firstRun) {
  localStorage['firstRun'] = 'true';
}  
// check if any settings have been saved
if (!firstRun) { 
    var mailOptionsLength = 5;
    for (var i = 0; i <= mailOptionsLength; i++) {
       if (localStorage["mail_picker_"+i] == 'true' || localStorage["mail_picker_"+i] == 'false' ) {
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
if (favoriteMailto == 'true') {
    createContext('Email', emailLink);
}
if (favoriteAOL == 'true') {
        createContext('AOL Mail', aolLink);
}
if (favoriteGmail == 'true') {
        createContext('Gmail', gmailLink);
}
if (favoriteHotmail == 'true') {
        createContext('Outlook', hotmailLink);
}
if (favoriteYmail == 'true') {
        createContext('Ymail', ymailLink);
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
    var mailsrvr = 'mailto:?Subject=';
    var newLineChar = '%0A';
    createEmailTab(info, tab, mailsrvr, newLineChar);
    
  /* 
  chrome.tabs.getSelected(null, function (tab){ 
		chrome.tabs.update(tab.id, { url: mailsrvr+pageTitle+'&body='+emailBody });
  }); */
}

// create a new Gmail
function gmailLink(info, tab) {
    var mailsrvr = 'http://mail.google.com/mail/?view=cm&fs=1&tf=1&=1&su=';
    var newLineChar = '%0A';
    createEmailTab(info, tab, mailsrvr, newLineChar);
}

// create a new hotmail
function hotmailLink(info, tab) {
    var mailsrvr = 'http://mail.live.com/?rru=compose&subject=';
    var newLineChar = '%0A';
    createEmailTab(info, tab, mailsrvr, newLineChar);
}

// create a new ymail
function ymailLink(info, tab) {
    var mailsrvr = 'http://us.mg40.mail.yahoo.com/neo/launch?action=compose&subj=';
    //var mailsrvr = 'http://compose.mail.yahoo.com?subj=';
    var newLineChar = '%0A';
    createEmailTab(info, tab, mailsrvr, newLineChar);
}

// create a new AOL mail
function aolLink(info, tab) {
    var mailsrvr = 'http://mail.aol.com/mail/ComposeMessage.aspx?subject=';
    var newLineChar = '%0A';
    createEmailTab(info, tab, mailsrvr, newLineChar);
}
