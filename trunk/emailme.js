// This is mine, but used the web for help, so some bit might not be

// Get stored options
var favoriteMailto = localStorage["mail_picker_1"];
var favoriteGmail = localStorage["mail_picker_2"];
var favoriteHotmail = localStorage["mail_picker_3"];
var favoriteYmail = localStorage["mail_picker_4"];

var beforeMsg = localStorage["mail_before"];
console.log("before message " + localStorage["mail_before"]);

var afterMsg = localStorage["mail_after"];
console.log("after message " + localStorage["mail_after"]);

var newLineAfter = localStorage["newLineAfter"];
var newLineAfterNum = localStorage["newLineAfterNum"];
var newLineBefore = localStorage["newLineBefore"];
var newLineBeforeNum = localStorage["newLineBeforeNum"];


if (favoriteMailto == 'true') {
	// Create email page option for each context type.
	var contexts = ["page","link"];
	for (var i = 0; i < contexts.length; i++) {
	  var context = contexts[i];
	  var title = "Send page via Email";
	  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
										   "onclick": emailLink});
	  console.log("'" + context + "' item:" + id);
	}
}

if (favoriteGmail == 'true') {
	// Create Gmail page option for each context type.
	contexts = ["page","link"];
	for (var i = 0; i < contexts.length; i++) {
	  var context = contexts[i];
	  var title = "Send page via Gmail";
	  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
										   "onclick": gmailLink});
	  console.log("'" + context + "' item:" + id);
	}
}

if (favoriteHotmail == 'true') {
	// Create Gmail page option for each context type.
	contexts = ["page","link"];
	for (var i = 0; i < contexts.length; i++) {
	  var context = contexts[i];
	  var title = "Send page via Hotmail";
	  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
										   "onclick": hotmailLink});
	  console.log("'" + context + "' item:" + id);
	}
}

if (favoriteYmail == 'true') {
	// Create Gmail page option for each context type.
	contexts = ["page","link"];
	for (var i = 0; i < contexts.length; i++) {
	  var context = contexts[i];
	  var title = "Send page via Ymail";
	  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
										   "onclick": ymailLink});
	  console.log("'" + context + "' item:" + id);
	}
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
  console.log("context " + pageUrl);
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
  console.log("context " + pageTitle);
  return pageTitle;
}

// add new lines
function addNewLines(varName, lineCount) {
	if (varName) {
		varName = "";
		for (i=0;i<lineCount;i++) {
			varName = varName + '%0A';
		}
	} else {
		varName = "";
	}
	
	return varName;
}

// create a new email
function emailLink(info, tab) {
  var pageUrl = getLink(info, tab);
  var pageTitle = getTitle(info, tab);
  var newLineAfterBody = addNewLines(newLineAfter, newLineAfterNum);
  var newLineBeforeBody = addNewLines(newLineBefore, newLineBeforeNum);
  var emailBody = beforeMsg + newLineAfterBody + pageUrl + newLineBeforeBody + afterMsg;
  chrome.tabs.getSelected(null, function (tab){ 
		chrome.tabs.update(tab.id, { url: 'mailto:?Subject='+pageTitle+'&body='+emailBody });
  }); 
  console.log("link " + pageUrl + " - " + pageTitle + " was sent");
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
}

// create a new Gmail
function gmailLink(info, tab) {
  var pageUrl = getLink(info, tab);
  var pageTitle = getTitle(info, tab);
  var newLineAfterBody = addNewLines(newLineAfter, newLineAfterNum);
  var newLineBeforeBody = addNewLines(newLineBefore, newLineBeforeNum);
  var emailBody = beforeMsg + newLineAfterBody + encodeURIComponent(pageUrl) + newLineBeforeBody +  afterMsg;
  //emailBody = encodeURIComponent(emailBody);
  window.open('http://mail.google.com/mail/?view=cm&fs=1&tf=1&=1&su='+pageTitle+'&body='+emailBody);
  console.log("link " + pageUrl + " - " + pageTitle + " was sent");
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
}

// create a new hotmail
function hotmailLink(info, tab) {
  var pageUrl = getLink(info, tab);
  var pageTitle = getTitle(info, tab);
  var newLineAfterBody = addNewLines(newLineAfter, newLineAfterNum);
  var newLineBeforeBody = addNewLines(newLineBefore, newLineBeforeNum);
  var emailBody = beforeMsg + newLineAfterBody + pageUrl + newLineBeforeBody +  afterMsg;
  //emailBody = encodeURIComponent(emailBody);
  window.open('http://mail.live.com/?rru=compose?&subject='+pageTitle+'&body='+emailBody);
  console.log("link " + pageUrl + " - " + pageTitle + " was sent");
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
}

// create a new ymail
function ymailLink(info, tab) {
  var pageUrl = getLink(info, tab);
  var pageTitle = getTitle(info, tab);
  var newLineAfterBody = addNewLines(newLineAfter, newLineAfterNum);
  var newLineBeforeBody = addNewLines(newLineBefore, newLineBeforeNum);
  var emailBody = beforeMsg + newLineAfterBody + encodeURIComponent(pageUrl) + newLineBeforeBody +  afterMsg;
  emailBody = encodeURIComponent(emailBody);
  window.open('http://compose.mail.yahoo.com?subj='+pageTitle+'&body='+emailBody);
  console.log("link " + pageUrl + " - " + pageTitle + " was sent");
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
}
