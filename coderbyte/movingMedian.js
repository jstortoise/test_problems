function MovingMedian(arr) { 
  const N = arr[0];
  let median = [];
  for (let i = 1; i < arr.length; i++) {
    let startIndex = Math.max(1, i - N + 1);
    let windowArray = arr.slice(startIndex, i + 1);
    let arraySize = windowArray.length;
    windowArray.sort(function(a, b) {
      return a - b;
    });
    console.log(windowArray);
    if (arraySize % 2 == 1) {
      median.push(windowArray[Math.floor(arraySize / 2)]);
    } else {
      median.push((windowArray[arraySize / 2 - 1] + windowArray[arraySize / 2]) / 2);
    }
  }
  // code goes here  
  return median.join(','); 

}
   
// keep this function call here 
console.log(MovingMedian( [3, 5, 2, 12, 1, 4, 0, -2]));