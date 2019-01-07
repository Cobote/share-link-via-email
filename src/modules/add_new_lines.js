function addNewLines(linesEnabled, lineCount, breakChar) {
  // add new lines
  let lineString = '';
  let i;

  if (linesEnabled !== false && linesEnabled !== 'false' && lineCount >= 1) {
    for (i = 0; i < lineCount; i += 1) {
      lineString += breakChar;
      // lineString = lineString + "<br/>";
      // varName = varName + '%0A';
    }
  } else {
    lineString = '';
  }

  return lineString;
}

export default addNewLines;
