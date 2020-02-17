function decode (roman) {
  var dict = {
    M: 1000,
    D: 500,
    C: 100,
    L: 50,
    X: 10,
    V: 5,
    I: 1
  }

  var ret = 0;
  for (var i = 0; i < roman.length; i++) {
    if (i < roman.length && dict[roman[i + 1]] > dict[roman[i]]) {
      ret -= dict[roman[i]];
    } else {
      ret += dict[roman[i]];
    }
  }
  return ret;
}