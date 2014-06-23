// Common functions used by the extension

// Restores saved values from localStorage.
// if none saved, use default values
function get_options() {
    var mailOptions = new Array();
    var mailOptionsLength = 5;

    // Restores each mail type
    for (var i = 0; i <= mailOptionsLength; i++) {
        if (localStorage["mail_picker_" + i])
        {
            mailOptions["mail_picker_" + i] = localStorage["mail_picker_" + i];
        } else {
            // if not set, leave as off
            mailOptions["mail_picker_" + i] = 'false';
            console.log("mail_picker_" + i + " not found");
        }
        console.log("mail_picker_" + i + ": " + localStorage["mail_picker_" + i]);
    }

    for (var i = 0; i <= mailOptionsLength; i++) {
        if (localStorage["new_window_" + i])
        {
            mailOptions["new_window_" + i] = localStorage["new_window_" + i];
        } else {
            // if not set, leave as off
            mailOptions["new_window_" + i] = 'false';
            console.log("new_window_" + i + " not found");
        }
        console.log("new_window_" + i + ": " + localStorage["new_window_" + i]);
    }

    if (localStorage["mail_to"])
    {
        mailOptions["mail_to"] = localStorage["mail_to"];
    } else {
        // default
        mailOptions["mail_to"] = "";
    }

    // email body
    if (localStorage["mail_before"])
    {
        mailOptions["mail_before"] = localStorage["mail_before"];
    } else {
        // default
        mailOptions["mail_before"] = "";
    }
    if (localStorage["mail_after"])
    {
        mailOptions["mail_after"] = localStorage["mail_after"];
    } else {
        // default
        mailOptions["mail_after"] = "";
    }

    // email body new lines
    if (localStorage["newLineAfter"])
    {
        mailOptions["newLineAfter"] = localStorage["newLineAfter"];
    } else {
        // default
        mailOptions["newLineAfter"] = false;
    }
    if (localStorage["newLineAfterNum"])
    {
        mailOptions["newLineAfterNum"] = localStorage["newLineAfterNum"];
    } else {
        // default
        mailOptions["newLineAfterNum"] = 1;
    }
    if (localStorage["newLineBefore"])
    {
        mailOptions["newLineBefore"] = localStorage["newLineBefore"];
    } else {
        // default
        mailOptions["newLineBefore"] = false;
    }
    if (localStorage["newLineBeforeNum"])
    {
        mailOptions["newLineBeforeNum"] = localStorage["newLineBeforeNum"];
    } else {
        // default
        mailOptions["newLineBeforeNum"] = 1;
    }

    return mailOptions;
}

// use the saved values for the form 
function restore_options() {
    // get saved values 
    var mailOptions = new Array();
    var mailOptionsLength = 5;
    var select, mailtype, toEmailAdd, beforeMsg, afterMsg;
    var newLineAfter, newLineAfterNum, newLineBefore, newLineBeforeNum;
    
    mailOptions = get_options();

    // Restores check box state
    for (var i = 0; i <= mailOptionsLength; i++) {
        mailtype = mailOptions["mail_picker_" + i];
        select = $("#mail_picker_" + i);
        if (mailtype === 'true') {
        	select.prop("checked", true);
        } else {
            select.prop("checked", false);
        }
    }
    for (i = 0; i <= mailOptionsLength; i++) {
        mailtype = mailOptions["new_window_" + i];
        select = $("#new_window_" + i);
        if (mailtype === 'true') {
        	select.prop("checked", true);
        } else {
        	select.prop("checked", false);
        }
    }

    toEmailAdd = mailOptions["mail_to"];
    $("#mail_to").val(toEmailAdd);

    beforeMsg = mailOptions["mail_before"];
    $("#mail_before").val(beforeMsg);

    afterMsg = mailOptions["mail_after"];
    $("#mail_after").val(afterMsg);

    newLineAfter = mailOptions["newLineAfter"];
    select = $("#newLineAfter");
    if (newLineAfter === 'true') {
        select.prop("checked", true);
        $("#newLineAfterNum").prop("disabled", false);
    } else {
        $("#newLineAfterNum").prop("disabled", true);
    }

    newLineAfterNum = mailOptions["newLineAfterNum"];
    $("#newLineAfterNum").val(newLineAfterNum);

    newLineBefore = mailOptions["newLineBefore"];
    select = $("#newLineBefore");
    if (newLineBefore === 'true') {
        select.prop("checked", true);
        $("#newLineBeforeNum").prop("disabled", false);
    } else {
        $("#newLineBeforeNum").prop("disabled", true);
    }

    newLineBeforeNum = mailOptions["newLineBeforeNum"];
    $("#newLineBeforeNum").val(newLineBeforeNum);
    
    toggle_newWindow_chbox();
}

//Saves options to localStorage.
// only email body section
function save_body_options() {
	var mail_to, mail_before, mail_after, newLineAfter, newLineBefore, newLineBeforeNum, status;
	
    mail_to = $("#mail_to").val();
    localStorage["mail_to"] = mail_to;
    
    mail_before = $("#mail_before").val();
    localStorage["mail_before"] = mail_before;

    mail_after = $("#mail_after").val();
    localStorage["mail_after"] = mail_after;

    newLineAfter = $("#newLineAfter").prop("checked");
    localStorage["newLineAfter"] = newLineAfter;

    newLineAfterNum = $("#newLineAfterNum").val();
    localStorage["newLineAfterNum"] = newLineAfterNum;

    newLineBefore = $("#newLineBefore").prop("checked");
    localStorage["newLineBefore"] = newLineBefore;

    newLineBeforeNum = $("#newLineBeforeNum").val();
    localStorage["newLineBeforeNum"] = newLineBeforeNum;

    // Update status to let user know options were saved.
    status = $("#status");
    status.html("Email body settings saved");
    setTimeout(function() {
    	status.html("");
    }, 1500);

    //reload context menu with new settings
    chrome.contextMenus.removeAll();
    chrome.extension.getBackgroundPage().window.location.reload();
}

//Saves options to localStorage.
// only email sender selection
function save_sender_options() {
    var mailOptionsLength = 5;
    var child;

    for (var i = 0; i <= mailOptionsLength; i++) {
        child = $("#mail_picker_" + i);
        localStorage["mail_picker_" + i] = child.prop("checked");
    }

    for (var i = 0; i <= mailOptionsLength; i++) {
        child = $("#new_window_" + i);
        localStorage["new_window_" + i] = child.prop("checked");
    }
    
    toggle_newWindow_chbox();

    // Update status to let user know options were saved.

    //reload context menu with new settings
    chrome.contextMenus.removeAll();
    chrome.extension.getBackgroundPage().window.location.reload();
}

// select/clear all toggle
function changeAll(checkbox, element) {
    var mailOptionsLength = 5;

    for (var i = 0; i <= mailOptionsLength; i++) {
    	if ($(checkbox).prop("checked") ) {
    		$("#" + element + "_" + i).prop("checked", true);
    	} else {
    		$("#" + element + "_" + i).prop("checked", false);
    	}
    }
}

// select/clear all checker
function changeCheck(element) {
    var changeChecker = true;
    var mailOptionsLength = 5;
    var select;

    for (var i = 1; i <= mailOptionsLength; i++) {
        select = $("#" + element + "_" + i);
        if (!select.prop("checked")) {
            changeChecker = false;
        }
    }

    // set All check value
    select = $("#" + element + "_0");
    select.prop("checked", changeChecker);
}

function addNewLines(linesEnabled, lineCount, breakChar) {
    // add new lines
    var lineString = "";
    if ((linesEnabled !== false && linesEnabled !== 'false') && lineCount >= 1) {
        for (var i = 0; i < lineCount; i++) {
            lineString = lineString + breakChar;
            //lineString = lineString + "<br/>";
            //varName = varName + '%0A';
        }
    } else {
        lineString = "";
    }

    return lineString;
}

// update preview
function getPreview() {
    // update preview text
    var preview = $("#previewText");
    var startMessage = $("#mail_before").val();
    var endMessage = $("#mail_after").val();
    var newLineAfter = $("#newLineAfter").prop("checked");
    var newLineAfterNum = $("#newLineAfterNum").val();
    var newLineBefore = $("#newLineBefore").prop("checked");
    var newLineBeforeNum = $("#newLineBeforeNum").val();

    var previewText = "";
    var exampleAddress = "http://www.google.com";
    var newLineAfterBody, newLineBeforeBody;

    // get new line string
    newLineAfterBody = addNewLines(newLineAfter, newLineAfterNum, "<br/>");
    newLineBeforeBody = addNewLines(newLineBefore, newLineBeforeNum, "<br/>");

    if (startMessage !== "" && newLineAfterBody === "") {
        startMessage = startMessage + " ";
    }
    if (endMessage !== "" && newLineBeforeBody === "") {
        endMessage = " " + endMessage;
    }

    // set preview text
    previewText = startMessage + newLineAfterBody + exampleAddress + newLineBeforeBody + endMessage;

    // send preview to display
    preview.html(previewText);
}

// Create email page option for each context type.
function createContext(contextName, onc_link) {
    var contexts = ["page", "link"];
    var context;
    var title;
    var id;

    for (var i = 0; i < contexts.length; i++) {
        context = contexts[i];
        title = "Send " + context + " via " + contextName;
        id = chrome.contextMenus.create({"title": title, "contexts": [context],
            "onclick": onc_link});
        console.log("added '" + context + "' for " + contextName + " as item:" + id);
    }
}

function save_default_options() {
    localStorage["mail_before"] = "";
    localStorage["mail_after"] = "";
    localStorage["mail_to"] = "";
    localStorage["newLineAfter"] = false;
    localStorage["newLineAfterNum"] = 1;
    localStorage["newLineBefore"] = false;
    localStorage["newLineBeforeNum"] = 1;

    var mailOptionsLength = 5;
    for (var i = 0; i <= mailOptionsLength; i++) {
        localStorage["mail_picker_" + i] = true;
    }
    for (var i = 0; i <= mailOptionsLength; i++) {
        localStorage["new_window_" + i] = true;
    }
}

function createEmailTab(info, tab, mailsrvr, newLineChar, newWindow) {
    var emailBody = "";
    var urlString = "";
    emailBody = createEmailMessage(info, tab, mailsrvr, newLineChar);

    urlString = mailsrvr+pageTitle+'&body='+emailBody;

    // open link in new tab
    //window.open(mailsrvr+pageTitle+'&body='+emailBody); // JS method
    if (newWindow === 'true') {
        chrome.tabs.create({url: urlString}); // chrome api method - new tab
    } else {
        chrome.tabs.update({url: urlString});  // chrome api method - same page
    }

    // write log of items used for the URL
    console.log("link " + pageUrl + " - " + pageTitle + " was sent");
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));
}

function createEmailMessage(info, tab, mailsrvr, newLineChar) {
    var pageUrl = getLink(info, tab);
    var pageTitle = getTitle(info, tab);
    var newLineAfterBody = addNewLines(newLineAfter, newLineAfterNum, newLineChar);
    var newLineBeforeBody = addNewLines(newLineBefore, newLineBeforeNum, newLineChar);
    var emailBody = '';
    var beforeMsgEncoded = beforeMsg;
    var afterMsgEncoded = afterMsg;

    pageUrl = encodeURIComponent(pageUrl);
    pageTitle = encodeURIComponent(pageTitle);

    if (beforeMsgEncoded !== "" && newLineAfterBody === "") {
        beforeMsgEncoded = beforeMsgEncoded + " ";
    }
    beforeMsgEncoded = encodeURIComponent(beforeMsgEncoded);

    if (afterMsgEncoded !== "" && newLineBeforeBody === "") {
        afterMsgEncoded = " " + afterMsgEncoded;
    }
    afterMsgEncoded = encodeURIComponent(afterMsgEncoded);


    emailBody = beforeMsgEncoded + newLineAfterBody + pageUrl + newLineBeforeBody + afterMsgEncoded;
    return emailBody;
}

//only email body section
function validate_body_options() {
	var errorFound = false;
	var currentItem;
	
	if ( $("#newLineAfter").prop("checked") ) {
		currentItem = $("#newLineAfterNum");
		if ( currentItem.val() < 0 ) {
			//alert("New line before URL needs to be 0 or higher");
			errorFound = true;
		}
		if ( (isNaN(currentItem.val() ) || currentItem.val() === "") ) {
			//alert("New line before URL is not a number");
			errorFound = true;
		}
	}
	if ( $("#newLineBefore").prop("checked") ) {
		currentItem = $("#newLineBeforeNum");
		if ( currentItem.val() < 0 ) {
			//alert("New line after URL needs to be 0 or higher");
			errorFound = true;
		}
		if ( (isNaN(currentItem.val() ) || currentItem.val() === "") ) {
			//alert("New line after URL is not a number");
			errorFound = true;
		}
	}
	
	return errorFound;
}

//toggle new window checkbox when mail sender is unchecked
function toggle_newWindow_chbox() {
	var mailOptionsLength = 5;
	var child;
	
	for (var i = 1; i <= mailOptionsLength; i++) {
		child = localStorage["mail_picker_" + i];
		if (child === 'false') {
			$("#new_window_" + i).prop("disabled", true);
		} else {
			$("#new_window_" + i).prop("disabled", false);
		}
    }
}