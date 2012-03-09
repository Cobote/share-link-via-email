// This is mine, but I used the web for help, so some bits might not be

// Restores saved values from localStorage.
// if none saved, use default values
function get_options() {
	var mailOptions = new Array();
	
  // Restores each mail type
  for (var i = 0; i <= 4; i++) {
	  if (localStorage["mail_picker_"+i])
	  {
		  mailOptions["mail_picker_"+i] = localStorage["mail_picker_"+i];
	  } else {
		  // default
		  mailOptions["mail_picker_"+i] = 'true';
	  }
    
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
