import { validateBodyOptions, saveBodyOptions, getPreview } from './body_section';
import { saveSenderOptions, restoreOptions } from './save_options';
import { changeAll, changeCheck } from './change_all';

function btnSaveClickHandler() {
  const isInvalid = validateBodyOptions();

  if (!isInvalid) {
    saveBodyOptions();
  }
  saveSenderOptions();
}
function newLineAfterClickHandler() {
  const optionDisable = $('#newLineAfterNum');

  if (!optionDisable.prop('disabled')) {
    optionDisable.prop('disabled', 'disabled');
  } else {
    optionDisable.prop('disabled', false);
  }

  getPreview();
}
function newLineBeforeClickHandler() {
  const optionDisable = $('#newLineBeforeNum');

  if (!optionDisable.prop('disabled')) {
    optionDisable.prop('disabled', 'disabled');
  } else {
    optionDisable.prop('disabled', false);
  }

  getPreview();
}
function btnResetClickHandler() {
  restoreOptions();
  getPreview();
}
function mailPicker0ClickHandler() {
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

export default {
  btnSaveClickHandler,
  newLineAfterClickHandler,
  newLineBeforeClickHandler,
  btnResetClickHandler,
  mailPicker0ClickHandler,
  mailPickerClickHandler,
  newWindow0ClickHandler,
  newWindowClickHandler,
};
