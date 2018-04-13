/* global chrome */

function openOptionsPageFn() {
  chrome.runtime.openOptionsPage();
}

function mailPickerClickHandlerFn() {
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


export const openOptionsPage = openOptionsPageFn;
export const mailPickerClickHandler = mailPickerClickHandlerFn;
