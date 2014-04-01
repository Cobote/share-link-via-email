// functions used by the "Options" page of the extension

function btn_save_clickHandler(e) {
    save_body_options();
    save_sender_options();
}
function newLineAfter_clickHandler(e) {
    var object_var = document.getElementById("newLineAfterNum");
    if (!object_var.disabled) {
        object_var.disabled = "disabled";
    } else {
        object_var.disabled = "";
    }

    getPreview();
}
function newLineBefore_clickHandler(e) {
    var object_var = document.getElementById("newLineBeforeNum");
    if (!object_var.disabled) {
        object_var.disabled = "disabled";
    } else {
        object_var.disabled = "";
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
    // on load events
    restore_options();
    getPreview();
    // end on load

    // listeners
    document.querySelector('#btn_save').addEventListener('click', btn_save_clickHandler);
    document.querySelector('#btn_restore').addEventListener('click', btn_reset_clickHandler);
    document.querySelector('#newLineAfter').addEventListener('change', newLineAfter_clickHandler);
    document.querySelector('#newLineBefore').addEventListener('change', newLineBefore_clickHandler);
    document.querySelector('#newLineAfterNum').addEventListener('keyup', getPreview);
    document.querySelector('#newLineBeforeNum').addEventListener('keyup', getPreview);
    document.querySelector('#mail_before').addEventListener('keyup', getPreview);
    document.querySelector('#mail_after').addEventListener('keyup', getPreview);

    document.querySelector('#mail_picker_0').addEventListener('change', mail_picker_0_clickHandler);
    document.querySelector('#mail_picker_1').addEventListener('change', mail_picker_clickHandler);
    document.querySelector('#mail_picker_2').addEventListener('change', mail_picker_clickHandler);
    document.querySelector('#mail_picker_3').addEventListener('change', mail_picker_clickHandler);
    document.querySelector('#mail_picker_4').addEventListener('change', mail_picker_clickHandler);
    document.querySelector('#mail_picker_5').addEventListener('change', mail_picker_clickHandler);

    document.querySelector('#new_window_0').addEventListener('change', new_window_0_clickHandler);
    document.querySelector('#new_window_1').addEventListener('change', new_window_clickHandler);
    document.querySelector('#new_window_2').addEventListener('change', new_window_clickHandler);
    document.querySelector('#new_window_3').addEventListener('change', new_window_clickHandler);
    document.querySelector('#new_window_4').addEventListener('change', new_window_clickHandler);
    document.querySelector('#new_window_5').addEventListener('change', new_window_clickHandler);
});