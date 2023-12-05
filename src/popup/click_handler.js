import { openEmailHandler } from '../modules/email_service_link';

function mailPickerClickHandler() {
  let mailPickerInt;

  mailPickerInt = this.id;
  mailPickerInt = mailPickerInt.split('_').pop();
  mailPickerInt = parseInt(mailPickerInt, 10);
  openEmailHandler(mailPickerInt);

  // Use timeout or email will not be created
  setTimeout(() => {
    window.close();
  }, 100);
}

export default mailPickerClickHandler;
