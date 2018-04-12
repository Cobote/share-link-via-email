// select/clear all toggle
function changeAllFn(checkbox, element) {
  const { mailOptionsLength } = localStorage;
  let i;

  for (i = 0; i <= mailOptionsLength; i += 1) {
    if (checkbox.getAttribute('checked')) {
      document.getElementById(`${element}_${i}`).setAttribute('checked', true);
    } else {
      document.getElementById(`${element}_${i}`).setAttribute('checked', false);
    }
  }
}

// select/clear all checker
function changeCheckFn(element) {
  let changeChecker = true;
  const { mailOptionsLength } = localStorage;
  let select;
  let i;

  for (i = 1; i <= mailOptionsLength; i += 1) {
    select = document.getElementById(`${element}_${i}`);
    if (!select.getAttribute('checked')) {
      changeChecker = false;
    }
  }

  // set All check value
  select = document.getElementById(`${element}_0`);
  select.setAttribute('checked', changeChecker);
}

export const changeAll = changeAllFn;
export const changeCheck = changeCheckFn;
