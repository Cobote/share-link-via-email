import { getValueFromLocalStorage } from '../modules/local_storage';

// select/clear all toggle
async function changeAllFn(checkbox, element) {
  const mailOptionsLength = await getValueFromLocalStorage('mailOptionsLength');
  let i;

  for (i = 0; i <= mailOptionsLength; i += 1) {
    const checkboxEl = document.getElementById(`${element}_${i}`);
    if (checkboxEl) {
      if (checkbox.checked) {
        checkboxEl.checked = true;
      } else {
        checkboxEl.checked = false;
      }
    }
  }
}

// select/clear all checker
async function changeCheckFn(element) {
  let changeChecker = true;
  const mailOptionsLength = await getValueFromLocalStorage('mailOptionsLength');
  let i;

  for (i = 1; i <= mailOptionsLength; i += 1) {
    const select = document.getElementById(`${element}_${i}`);
    if (select && !select.checked) {
      changeChecker = false;
    }
  }

  // set All check value
  const selectAll = document.getElementById(`${element}_0`);
  if (selectAll) {
    selectAll.checked = changeChecker;
  }
}

export const changeAll = changeAllFn;
export const changeCheck = changeCheckFn;
