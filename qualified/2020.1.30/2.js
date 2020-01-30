function markdownParser (markdown) {
  var regExp = /^ *#{1,6} /;
  var match = markdown.match(regExp);
  
  if (match == null) {
    return markdown;
  }
  
  var headerContent = markdown.substring(match[0].length).trim();
  var headerLevel = match[0].trim().length;
  return `<h${headerLevel}>${headerContent}</h${headerLevel}>`;
}