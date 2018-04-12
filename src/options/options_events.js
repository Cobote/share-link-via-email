// functions used by the "Options" page of the extension

import 'bootstrap/dist/css/bootstrap.min.css';
import './options.css';
import { restoreOptions, saveBodyOptions, saveSenderOptions, changeAll, changeCheck, validateBodyOptions } from '../functions';

function btnSaveClickHandlerFn() {
  const isInvalid = validateBodyOptions();

  if (!isInvalid) {
    saveBodyOptions();
  }
  saveSenderOptions();
}
function newLineAfterClickHandlerFn() {
  const optionDisable = $('#newLineAfterNum');

  if (!optionDisable.prop('disabled')) {
    optionDisable.prop('disabled', 'disabled');
  } else {
    optionDisable.prop('disabled', false);
  }

  getPreview();
}
function newLineBeforeClickHandlerFn() {
  const optionDisable = $('#newLineBeforeNum');

  if (!optionDisable.prop('disabled')) {
    optionDisable.prop('disabled', 'disabled');
  } else {
    optionDisable.prop('disabled', false);
  }

  getPreview();
}
function btnResetClickHandlerFn() {
  restore_options();
  getPreview();
}
function mailPicker0ClickHandlerFn() {
  changeAll(this, 'mail_picker');
  saveSenderOptions();
}
function mailPickerClickHandler() {
  changeCheck('mail_picker');
  saveSenderOptions();
}
function newWindow0ClickHandler() {
  changeAll(this, 'new_window');
  saveSenderOptions();
}
function newWindowClickHandler() {
  changeCheck('new_window');
  saveSenderOptions();
}

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', () => {
  const { mailOptionsLength } = localStorage;
  let i;

  // on load events
  restoreOptionsFn();
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
  for (i = 1; i <= mailOptionsLength; i += 1) {
    $(`#mail_picker_${i}`).change(mail_picker_clickHandler);
  }

  $('#new_window_0').change(new_window_0_clickHandler);
  for (i = 1; i <= mailOptionsLength; i += 1) {
    $(`#new_window_${i}`).change(new_window_clickHandler);
  }

  // stop normal form submission
  const form = document.getElementById('optionsForm');
  form.onsubmit = () => false;
});

export const btnSaveClickHandler = btnSaveClickHandlerFn;
export const newLineAfterClickHandler = newLineAfterClickHandlerFn;
export const newLineBeforeClickHandler = newLineBeforeClickHandlerFn;
export const btnResetClickHandler = btnResetClickHandlerFn;
export const mailPicker0ClickHandler = mailPicker0ClickHandlerFn;
