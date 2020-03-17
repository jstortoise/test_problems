function calc(board, x, y, pX = -1, pY = -1, step = 0) {
    const possiblePos = [
        [x, y - 1],
        [x, y + 1],
        [x + 1, y],
        [x - 1, y]
    ];

    const m = board && board.length || 0;
    const n = board && board[0] && board[0].length || 0;

    let max = -1, row = -1, col = -1;
    for (let [i, j] of possiblePos) {
        if (i >= 0 && j >= 0 && i < m && j < n && (pX != i || pY != j)) {
            if (max < board[i][j]) {
                max = board[i][j];
                row = i;
                col = j;
            }
        }
    }

    if (step >= 2) {
        console.log('step = ', step, 'max = ', max);
        return max;
    } else {
        let next = calc(board, row, col, x, y, step + 1);
        if (!next) {
            return -1;
        }
        
        max = max * Math.pow(10, 2 - step) + next;
        console.log('step = ', step, 'max = ', max);
        return max;
    }
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

    return [maxArr, maxVal];
}

function solution(board) {
    let ret = -1;
    let [maxArr] = getPrevMax(board);

    while (true) {
        maxArr.forEach(({ row, col, val }) => {
            let max = val * 1000 + calc(board, row, col);
            console.log(row, col, val, max);
            if (max > ret) {
                ret = max;
            }
        });

        if (ret == -1) {
            console.log('false');
            [maxArr] = getPrevMax(board);
        } else {
            break;
        }
    }
    
    console.log(ret);
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


console.log(board[0]);
console.log(board[1]);
console.log(board[2]);
solution(board);