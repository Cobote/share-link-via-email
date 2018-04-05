// functions used by the "Options" page of the extension

function btn_save_clickHandler(e) {
	var isInvalid = validate_body_options();
	if (!isInvalid) {
		save_body_options();
	}
    save_sender_options();
}
function newLineAfter_clickHandler(e) {
    var optionDisable = $("#newLineAfterNum");
    if (!optionDisable.prop("disabled")) {
    	optionDisable.prop("disabled", "disabled");
    } else {
    	optionDisable.prop("disabled", false);
    }

    getPreview();
}
function newLineBefore_clickHandler(e) {
    var optionDisable = $("#newLineBeforeNum");
    if (!optionDisable.prop("disabled")) {
    	optionDisable.prop("disabled", "disabled");
    } else {
    	optionDisable.prop("disabled", false);
    }

    getPreview();
}
function btn_reset_clickHandler(e) {
    restore_options();
    getPreview();
}
function mail_picker_0_clickHandler(e) {
    changeAll(this, "mail_picker");
    save_sender_options();
}
function mail_picker_clickHandler(e) {
    changeCheck("mail_picker");
    save_sender_options();
}
function new_window_0_clickHandler(e) {
    changeAll(this, "new_window");
    save_sender_options();
}
function new_window_clickHandler(e) {
    changeCheck("new_window");
    save_sender_options();
}

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function() {
	var mailOptionsLength = localStorage['mailOptionsLength'];
    // on load events
    restore_options();
    getPreview();
    // end on load

    // listeners
    $('#btn_save').click(btn_save_clickHandler);
    $('#btn_restore').click(btn_reset_clickHandler);
    $('#newLineAfter').change(newLineAfter_clickHandler);
    $('#newLineBefore').change(newLineBefore_clickHandler);
    $('#newLineAfterNum').keyup(getPreview);
    $('#newLineBeforeNum').keyup(getPreview);
    $('#mail_before').keyup(getPreview);
    $('#mail_after').keyup(getPreview);

    $('#mail_picker_0').change(mail_picker_0_clickHandler);
	for (var i = 1; i <= mailOptionsLength; i++) {
		$('#mail_picker_' + i).change(mail_picker_clickHandler);
	}

    $('#new_window_0').change(new_window_0_clickHandler);
	for (var i = 1; i <= mailOptionsLength; i++) {
		$('#new_window_' + i).change(new_window_clickHandler);
	}

    // stop normal form submission
    $( "form" ).submit(function( event ) {
	  event.preventDefault();
	});
});