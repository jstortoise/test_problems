function firstNonRepeatingLetter (str) {
  var i = 0, len = str.length;
  for (i = 0; i < len; i++) {
    if (str.substr(i + 1).toLowerCase().indexOf(str[i].toLowerCase()) == -1) {
      return str[i];
    }
    str += str[i];
  }
  return '';
}