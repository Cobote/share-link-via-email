// select/clear all toggle
function changeAllFn(checkbox, element) {
  const { mailOptionsLength } = localStorage;
  let i;

  for (i = 0; i <= mailOptionsLength; i += 1) {
    if (checkbox.checked) {
      document.getElementById(`${element}_${i}`).checked = true;
    } else {
      document.getElementById(`${element}_${i}`).checked = false;
    }
  }
}

// select/clear all checker
function changeCheckFn(element) {
  let changeChecker = true;
  const { mailOptionsLength } = localStorage;
  let i;

  for (i = 1; i <= mailOptionsLength; i += 1) {
    const select = document.getElementById(`${element}_${i}`);
    if (!select.checked) {
      changeChecker = false;
    }
  }

  // set All check value
  const selectAll = document.getElementById(`${element}_0`);
  selectAll.checked = changeChecker;
}

export const changeAll = changeAllFn;
export const changeCheck = changeCheckFn;
