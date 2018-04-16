import { getOptions } from '../modules/local_storage';

// use the saved values for the form
function showHideOptions() {
  // get saved values
  const { mailOptionsLength } = localStorage;
  let select;
  let mailtype;
  let i;

  const mailOptions = getOptions();

  // Hide options not selected
  for (i = 0; i <= mailOptionsLength; i += 1) {
    mailtype = mailOptions[`mail_picker_${i}`];
    select = document.getElementById(`mail_picker_${i}`);
    if (mailtype !== 'true') {
      select.style.display = 'none';
    }
  }
}

export default showHideOptions;
