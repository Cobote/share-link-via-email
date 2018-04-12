import '../images/stock_mail.png';
import { saveDefaultOptions, getOptions, createEmailTab, createContext, getOptionsShownCount, openEmailHandler, getSingleOptionInt } from './modules/functions';

// Creates each of the links to be used by each type of Email client
localStorage.mailOptionsLength = 6;

// check for first run
let firstRun = (localStorage.firstRun === 'true');
// now save that first run has started
if (!firstRun) {
  localStorage.firstRun = 'true';
}
// check if any settings have been saved
if (!firstRun) {
  const { mailOptionsLength } = localStorage;
  let i;

  for (i = 0; i <= mailOptionsLength; i += 1) {
    if (localStorage[`mail_picker_${i}`] === 'true' || localStorage[`mail_picker_${i}`] === 'false') {
      firstRun = 'true';
      // console.log("Not first time - found save option: localStorage['mail_picker_"+ i +"']
      // as "+ localStorage["mail_picker_"+i]);
      break;
    }
  }
}
// console.log("False if first time: " + firstRun);
// run actions if first run & no settings saved
if (!firstRun) {
  // Set all options to default
  saveDefaultOptions();
}