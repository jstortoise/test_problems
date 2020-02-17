function calculate (expression) {
  var stack = [];
  var expression_items = expression.split(' ');
  
  for (var i = 0; i < expression_items.length; i++) {
    if (isNaN(expression_items[i])) { 
      var b = parseFloat(stack.pop());
      var a = parseFloat(stack.pop());
      
      if (expression_items[i] === '+') {
        a = a + b;
      } else if (expression_items[i] === '-') {
        a = a - b;
      } else if (expression_items[i] === '*') {
        a = a * b;
      } else if (expression_items[i] === '/') {
        a = a / b;
      }
      stack.push(a);
    } else {
      stack.push(expression_items[i]);
    }
  }
  
  if (stack.length === 0) {
    return 0;
  }
  
  return stack.pop();
}