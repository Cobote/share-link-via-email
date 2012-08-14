// This is mine, but I used the web for help, so some bits might not be

// Restores saved values from localStorage.
// if none saved, use default values
function get_options() {
	var mailOptions = new Array();
        var mailOptionsLength = 5;
	
  // Restores each mail type
  for (var i = 0; i <= mailOptionsLength; i++) {
	  if (localStorage["mail_picker_"+i])
	  {
		  mailOptions["mail_picker_"+i] = localStorage["mail_picker_"+i];
	  } else {
		  // if not set, leave as off
		  mailOptions["mail_picker_"+i] = 'false';
                  console.log("mail_picker_"+ i +" not found");
	  }
          console.log("mail_picker_"+ i +": " + localStorage["mail_picker_"+i]);
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
    mailOptions = get_options();
    
  // Restores check box state
  for (var i = 0; i <= mailOptionsLength; i++) {
    var mailtype = mailOptions["mail_picker_"+i];
	var select = document.getElementById("mail_picker_"+i);
	if (mailtype == 'true') {
		select.checked = true;
	} else {
            select.checked = false;
        }
  }
  
  var beforeMsg = mailOptions["mail_before"];
  var select = document.getElementById("mail_before");
  select.value = beforeMsg;
  
  var afterMsg = mailOptions["mail_after"];
  var select = document.getElementById("mail_after");
  select.value = afterMsg;
  
  var newLineAfter = mailOptions["newLineAfter"];
  var select = document.getElementById("newLineAfter");
  if (newLineAfter == 'true') {
	select.checked = true;
        document.getElementById("newLineAfterNum").disabled = '';
  } else {
      document.getElementById("newLineAfterNum").disabled = 'disabled';
  }
  
  var newLineAfterNum = mailOptions["newLineAfterNum"];
  var select = document.getElementById("newLineAfterNum");
  select.value = newLineAfterNum;
  
  var newLineBefore = mailOptions["newLineBefore"];
  var select = document.getElementById("newLineBefore");
  if (newLineBefore == 'true') {
	select.checked = true;
        document.getElementById("newLineBeforeNum").disabled = '';
  } else {
      document.getElementById("newLineBeforeNum").disabled = 'disabled';
  }
  
  var newLineBeforeNum = mailOptions["newLineBeforeNum"];
  var select = document.getElementById("newLineBeforeNum");
  select.value = newLineBeforeNum;
}

//Saves options to localStorage.
// only email body section
function save_body_options() {  
  select = document.getElementById("mail_before");
  var mail_before = select.value;
  localStorage["mail_before"] = mail_before;
  
  select = document.getElementById("mail_after");
  var mail_after = select.value;
  localStorage["mail_after"] = mail_after;

  select = document.getElementById("newLineAfter");
  var newLineAfter = select.checked;
  localStorage["newLineAfter"] = newLineAfter;

  select = document.getElementById("newLineAfterNum");
  var newLineAfterNum = select.value;
  localStorage["newLineAfterNum"] = newLineAfterNum;

  select = document.getElementById("newLineBefore");
  var newLineBefore = select.checked;
  localStorage["newLineBefore"] = newLineBefore;

  select = document.getElementById("newLineBeforeNum");
  var newLineBeforeNum = select.value;
  localStorage["newLineBeforeNum"] = newLineBeforeNum;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Email body saved";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
  
  //reload context menu with new settings
  chrome.contextMenus.removeAll();
  chrome.extension.getBackgroundPage().window.location.reload();
}

//Saves options to localStorage.
// only email sender selection
function save_sender_options() {
  var mailOptionsLength = 5;
  
  for (var i = 0; i <= mailOptionsLength; i++) {
    var child = document.getElementById("mail_picker_"+i);
	localStorage["mail_picker_"+i] = child.checked;
  }

  // Update status to let user know options were saved.
  
  //reload context menu with new settings
  chrome.contextMenus.removeAll();
  chrome.extension.getBackgroundPage().window.location.reload();
}

// select/clear all toggle
function changeAll(checkbox) {
    var mailOptionsLength = 5;
    
	for (var i = 0; i <= mailOptionsLength; i++) {
		var select = document.getElementById("mail_picker_"+i);
		select.checked = checkbox.checked;
  }
}

// select/clear all checker
function changeCheck() {
	var changeChecker = true;
        var mailOptionsLength = 5;
        
	for (var i = 1; i <= mailOptionsLength; i++) {
		var select = document.getElementById("mail_picker_"+i);
		if (!select.checked) {
			changeChecker = false;
		}
	}
	
	// set All check value
	var select = document.getElementById("mail_picker_0");
	select.checked = changeChecker;
}

function addNewLines(linesEnabled, lineCount, breakChar) {
    // add new lines
    var lineString = ""
        if (linesEnabled == 'true' && lineCount >= 1) {
            for (i=0;i<lineCount;i++) {
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
	var preview = document.getElementById("previewText");
	var startMessage = document.getElementById("mail_before");
	var endMessage = document.getElementById("mail_after");
	var newLineAfter = document.getElementById("newLineAfter").checked;
	var newLineAfterNum = document.getElementById("newLineAfterNum");
	var newLineBefore = document.getElementById("newLineBefore").checked;
	var newLineBeforeNum = document.getElementById("newLineBeforeNum");
        var exampleAddress = "http://www.google.com";
	  
	// test if value is set
	function isValueSet(inputName) {
		if (inputName.value) {
			inputName = inputName.value;
		} else {
			inputName = "";
		}
		
		return inputName;
	}	
	
	// use above function
	startMessage = isValueSet(startMessage);
        startMessage = (startMessage != "" ? startMessage+" " : startMessage);
	endMessage = isValueSet(endMessage);
        endMessage = (endMessage != "" ? " "+endMessage : endMessage);
	newLineAfterNum = isValueSet(newLineAfterNum);
	newLineBeforeNum = isValueSet(newLineBeforeNum);
	
        // get new line string
	newLineAfter = addNewLines(newLineAfter, newLineAfterNum, "<br/>");
	newLineBefore = addNewLines(newLineBefore, newLineBeforeNum, "<br/>");
	
	// set preview
	//startMessage = String.prototype.trim(startMessage);
	//endMessage = String.prototype.trim(endMessage);
	preview.innerHTML = startMessage + newLineAfter + exampleAddress + newLineBefore + endMessage;
}

// Create email page option for each context type.
function createContext(contextName, onc_link) {
    var contexts = ["page","link"];
    var context;
    var title;
    var id;
    
    for (var i = 0; i < contexts.length; i++) {
        context = contexts[i];
        title = "Send "+ context +" via "+ contextName;
        id = chrome.contextMenus.create({"title": title, "contexts":[context],
										   "onclick": onc_link});
        console.log("added '" + context + "' for "+ contextName +" as item:" + id);
    }
}

function save_default_options() {
    localStorage["mail_before"] = "";
    localStorage["mail_after"] = "";
    localStorage["newLineAfter"] = false;
    localStorage["newLineAfterNum"] = 1;
    localStorage["newLineBefore"] = false;
    localStorage["newLineBeforeNum"] = 1;

    var mailOptionsLength = 5;
    for (var i = 0; i <= mailOptionsLength; i++) {
        localStorage["mail_picker_"+i] = true;
    }
}

function createEmailTab(info, tab, mailsrvr, newLineChar) {
    var pageUrl = getLink(info, tab);
    var pageTitle = getTitle(info, tab);
    var newLineAfterBody = addNewLines(newLineAfter, newLineAfterNum, newLineChar);
    var newLineBeforeBody = addNewLines(newLineBefore, newLineBeforeNum, newLineChar);
    var emailBody = '';
    var beforeMsgEncoded = beforeMsg;
    var afterMsgEncoded = afterMsg;

    pageUrl = encodeURIComponent(pageUrl);
    pageTitle = encodeURIComponent(pageTitle);
    beforeMsgEncoded = (beforeMsgEncoded != "" ? beforeMsgEncoded+" " : beforeMsgEncoded);
    beforeMsgEncoded = encodeURIComponent(beforeMsgEncoded);
    afterMsgEncoded = (afterMsgEncoded != "" ? " "+afterMsgEncoded : afterMsgEncoded);
    afterMsgEncoded = encodeURIComponent(afterMsgEncoded);

    emailBody = beforeMsgEncoded + newLineAfterBody + pageUrl + newLineBeforeBody + afterMsgEncoded;
    window.open(mailsrvr+pageTitle+'&body='+emailBody);
    console.log("link " + pageUrl + " - " + pageTitle + " was sent");
    console.log("item " + info.menuItemId + " was clicked");
    console.log("info: " + JSON.stringify(info));
    console.log("tab: " + JSON.stringify(tab));
}