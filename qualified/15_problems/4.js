function autocorrect(input){
  var regexp = new RegExp("\\byou+\\b|\\bu\\b", "ig");
  return input.replace(regexp, 'your client');
}
