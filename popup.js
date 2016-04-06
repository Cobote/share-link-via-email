// functions used by the "popup" page of the extension

function openOptionsPage(e) {
    chrome.runtime.openOptionsPage();
}

function mail_picker_clickHandler(e) {
    var mail_picker_int;
    mail_picker_int = $(this).attr('id');
    console.log(mail_picker_int);
    mail_picker_int = mail_picker_int.split("_").pop();
    console.log(mail_picker_int);
    mail_picker_int = parseInt(mail_picker_int, 10);
    console.log(mail_picker_int);
    open_email_handler(mail_picker_int);

    // Use timeout or email will not be created
    setTimeout(function(){ window.close(); }, 100);
}

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function() {
	var mailOptionsLength = localStorage['mailOptionsLength'];
    var i;
    // on load events
    showHide_options();
    // end on load

    // listeners
    $('#optionsLink').click(openOptionsPage);

    for (i = 1; i <= mailOptionsLength; i++) {
        $('#mail_picker_' + i).click(mail_picker_clickHandler);
    }
});