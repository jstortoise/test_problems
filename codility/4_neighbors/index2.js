function calc(board, x, y, pX = -1, pY = -1, step = 2) {
    let possiblePos = [{
        val: -1, pos: [x, y - 1]
    }, {
        val: -1, pos: [x, y + 1]
    }, {
        val: -1, pos: [x + 1, y]
    }, {
        val: -1, pos: [x - 1, y]
    }];

    const curVal = board[x][y];
    if (step == 0) return curVal;

    const m = board.length || 0;
    const n = board[0].length;

    for (let obj of possiblePos) {
        const { pos } = obj;
        if ((pX != pos[0] || pY != pos[1]) && pos[0] >= 0 && pos[1] >= 0 && pos[0] < m && pos[1] < n) {
            obj.val = board[pos[0]][pos[1]]
        }
    }

    const max = possiblePos.reduce((prev, obj) => obj.val > prev ? obj.val : prev, 0);
    if (max < 0) {
        return -1;
    }

    for (let obj of possiblePos) {
        const { val, pos } = obj;
        
        if (val == max) {
            return 
        } else {
            return -1;
        }
    }

    console.log(possiblePos);
}

function getPrevMax(board, max = -1) {
    let arr = [], maxArr = [];
    board.forEach(obj => {
        let arr1 = obj.filter(val => val != max);
        arr = [...arr, ...arr1];
    });
    
    let maxVal = Math.max.apply(0, arr);

    board.forEach((arr, i) => {
        let index = arr.indexOf(maxVal);
        if (index >= 0) {
            maxArr.push({ row: i, col: index, val: maxVal });
        }
    });

    return maxArr;
}

function solution(board) {
    const m = board.length || 0;
    const n = board && board[0].length || 0;

    if (m == 0 || n == 0 || (m == 1 && n < 4) || (m < 4 && n == 1)) {
        return 0;
    }

    let maxArr = getPrevMax(board);
    maxArr.forEach(({ row, col }) => {
        calc(board, row, col);
    });
    console.log(maxArr);
}


// const board = [
//     [1, 1, 1],
//     [1, 3, 4],
//     [1, 4, 3]
// ];

const board = [
    [9, 1, 1, 0, 7],
    [1, 0, 2, 1, 0],
    [1, 9, 1, 1, 0]
];

// const board = [
//     [0, 1, 5, 0, 0]
// ];


console.log('Array = ', board);
solution(board);