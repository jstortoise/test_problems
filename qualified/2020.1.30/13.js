function longestSeries (arr) {
  var max_dup_count = 0, dup_count = 0, dup_val = 0;
  
  for (var i = 0; i < arr.length; i++) {
    if (dup_val == arr[i]) {
      dup_count++;
    } else {
      max_dup_count = Math.max(max_dup_count, dup_count);
      dup_count = 1;
      dup_val = arr[i];
    }
  }
  
  return Math.max(max_dup_count, dup_count);
}