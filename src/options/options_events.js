// functions used by the "Options" page of the extension

import 'bootstrap/dist/css/bootstrap.min.css';
import './options.css';
import optionsClickHandler from './click_handler';
import { restoreOptions } from './save_options';
import { getPreview } from './body_section';
import { getValueFromLocalStorage } from '../modules/local_storage';

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', async () => {
  const mailOptionsLength = await getValueFromLocalStorage('mailOptionsLength');
  let i;

  // on load events
  restoreOptions();
  getPreview();
  // end on load

  // listeners
  document
    .getElementById('btn_save')
    .addEventListener('click', optionsClickHandler.btnSaveClickHandler);
  document
    .getElementById('btn_restore')
    .addEventListener('click', optionsClickHandler.btnResetClickHandler);
  document
    .getElementById('newLineAfter')
    .addEventListener('change', optionsClickHandler.newLineAfterClickHandler);
  document
    .getElementById('newLineBefore')
    .addEventListener('change', optionsClickHandler.newLineBeforeClickHandler);
  document
    .getElementById('newLineAfterNum')
    .addEventListener('change', getPreview);
  document
    .getElementById('newLineAfterNum')
    .addEventListener('keyup', getPreview);
  document
    .getElementById('newLineBeforeNum')
    .addEventListener('change', getPreview);
  document
    .getElementById('newLineBeforeNum')
    .addEventListener('keyup', getPreview);
  document.getElementById('mail_before').addEventListener('keyup', getPreview);
  document.getElementById('mail_after').addEventListener('keyup', getPreview);

  document
    .getElementById('mail_picker_0')
    .addEventListener('change', optionsClickHandler.mailPicker0ClickHandler);
  for (i = 1; i <= mailOptionsLength; i += 1) {
    const mailPickEl = document.getElementById(`mail_picker_${i}`);
    if (mailPickEl) {
      mailPickEl.addEventListener(
        'change',
        optionsClickHandler.mailPickerClickHandler
      );
    }
  }

  document
    .getElementById('new_window_0')
    .addEventListener('change', optionsClickHandler.newWindow0ClickHandler);
  for (i = 1; i <= mailOptionsLength; i += 1) {
    const newEl = document.getElementById(`new_window_${i}`);
    if (newEl) {
      document
        .getElementById(`new_window_${i}`)
        .addEventListener('change', optionsClickHandler.newWindowClickHandler);
    }
  }

  // stop normal form submission
  const form = document.getElementById('optionsForm');
  form.onsubmit = () => false;
});
