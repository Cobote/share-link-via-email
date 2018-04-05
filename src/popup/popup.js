/* global chrome */
// functions used by the "popup" page of the extension

function openOptionsPage() {
  chrome.runtime.openOptionsPage();
}

function mailPickerClickHandler() {
  let mailPickerInt;

  mailPickerInt = $(this).attr('id');
  // console.log(mail_picker_int);
  mailPickerInt = mailPickerInt.split('_').pop();
  // console.log(mail_picker_int);
  mailPickerInt = parseInt(mailPickerInt, 10);
  // console.log(mail_picker_int);
  open_email_handler(mailPickerInt);

  // Use timeout or email will not be created
  setTimeout(() => { window.close(); }, 100);
}

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', () => {
  const [mailOptionsLength] = localStorage;
  let i;
  // on load events
  showHide_options();
  // end on load

  // listeners
  $('#optionsLink').click(openOptionsPage);

  for (i = 1; i <= mailOptionsLength; i += 1) {
    $(`#mail_picker_${i}`).click(mail_picker_clickHandler);
  }
});
