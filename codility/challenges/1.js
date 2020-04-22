// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(H) {
    // write your code in JavaScript (Node.js 8.9.4)
    const n = H.length;
    let maxHeight = 0, leftWidth = 0, leftMax = 0, rightWidth = 0, rightMax = 0;
    
    // Get maxHeight
    H.forEach((val, index) => {
        if (val > maxHeight) {
            maxHeight = val;
            leftWidth = index;
        }
    });
    
    // Get left maxHeight
    for (let i = 0; i < leftWidth; i++) {
        if (H[i] > leftMax) {
            leftMax = H[i];
        }
    }
    
    // Get rightWidth, right max height
    for (let i = n - 1; i > leftWidth; i--) {
        if (H[i] == maxHeight) break;

        if (H[i] > rightMax) {
            rightMax = H[i];
        }
        rightWidth++;
    }

    console.log('maxHeight', maxHeight);
    console.log('leftMaxHeight', leftMax);
    console.log('leftWidth', leftWidth);
    console.log('rightMaxHeight', rightMax);
    console.log('rightWidth', rightWidth);
    
    // Get total area
    let totalArea = 0;

    if (leftMax > rightMax) {
        if (rightWidth > 0) {
            totalArea = (n - rightWidth) * maxHeight + rightMax * rightWidth;
        } else {
            totalArea = (n - leftWidth) * maxHeight + leftMax * leftWidth;
        }
    } else if (leftMax < rightMax) {
        if (leftWidth > 0) {
            totalArea = (n - leftWidth) * maxHeight + leftMax * leftWidth;
        } else {
            totalArea = (n - rightWidth) * maxHeight + rightMax * rightWidth;
        }
    } else if (leftWidth > rightWidth) {
        totalArea = leftWidth * leftMax + (n - leftWidth) * maxHeight;
    } else {
        totalArea = rightWidth * rightMax + (n - rightWidth) * maxHeight;
    }
    
    return totalArea;
}

let nums = [];
for (let i = 0; i < 50; i++) {
    nums.push(i + 1);
}

console.log(nums);

nums = [
    7, 7, 7, 1, 1, 6, 6, 6
];

const area = solution(nums);

console.log(area);