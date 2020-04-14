// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(H) {
    // write your code in JavaScript (Node.js 8.9.4)
    const n = H.length;
    
    // Find max height
    let maxVal = H[0];
    H.forEach((val, index) => {
        if (maxVal < val) maxVal = val;
    });
    
    // Find max height indexes
    let maxIndexes = [];
    H.forEach((val, index) => {
        if (maxVal == val) maxIndexes.push(index);
    });
    
    // Find max index in center
    let maxIndex = maxIndexes[0];
    if (maxIndexes.length > 1) {
        let diff = n / 2, diffIndex = 0;
        maxIndexes.forEach((val, index) => {
            if (Math.abs(n / 2 - val) < diff) {
                diff = val;
                diffIndex = index;
            }
        });
        maxIndex = maxIndexes[diffIndex];
    }
    
    // Get areas
    let max1 = 0, max2 = 0;
    H.forEach((val, index) => {
        if (index < maxIndex && val > max1) {
            max1 = val;
        } else if (index > maxIndex && val > max2) {
            max2 = val;
        }
    });
    
    // Compare 2 area
    let totalArea = 0;
    if (max1 > max2 && max2 != 0) {
        totalArea = (maxIndex + 1) * H[maxIndex] + max2 * (H.length - maxIndex - 1);
    } else if (max1 < max2 && max1 != 0) {
        totalArea = (maxIndex) * max1 + H[maxIndex] * (H.length - maxIndex);
    } else {
        if (maxIndex >= H.length / 2) {
            totalArea = (maxIndex) * max1 + H[maxIndex] * (H.length - maxIndex);
        } else {
            totalArea = (maxIndex + 1) * H[maxIndex] + max2 * (H.length - maxIndex - 1);
        }
    }
    
    return totalArea;
}