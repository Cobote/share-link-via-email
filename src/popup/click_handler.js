import { openEmailHandler } from '../modules/email_service_link';

function mailPickerClickHandler() {
  let mailPickerInt;

  mailPickerInt = this.id;
  // console.log(mail_picker_int);
  mailPickerInt = mailPickerInt.split('_').pop();
  // console.log(mail_picker_int);
  mailPickerInt = parseInt(mailPickerInt, 10);
  // console.log(mail_picker_int);
  openEmailHandler(mailPickerInt);

  // Use timeout or email will not be created
  setTimeout(() => { window.close(); }, 100);
}


export default mailPickerClickHandler;
