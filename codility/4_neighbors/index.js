function solution(board) {
    const m = board.length || 0;
    const n = board && board[0].length || 0;

    if (m == 0 || n == 0 || (m == 1 && n < 4) || (m < 4 && n == 1)) {
        return 0;
    }

    let maxArr = [], ret = 0, [max, maxVal] = getPrevMax(board);

    while (true) {
        max.forEach((obj, i1) => {
            const { row, col, val: val1 } = obj;

            obj.next = getNextValues(board, row, col);

            // Parent row, col
            if (obj.next) {
                obj.next.forEach((obj, i2) => {
                    const { row: i, col: j, val: val2 } = obj;

                    obj.next = getNextValues(board, i, j, row, col);

                    // Parent row, col
                    if (obj.next) {
                        obj.next.forEach((obj, i3) => {
                            const { row: x, col: y, val: val3 } = obj;
                            obj.next = getNextValues(board, x, y, i, j);

                            if (obj.next) {
                                obj.next.forEach(({ val: val4 }) => {
                                    maxArr.push(val1 * 1000 + val2 * 100 + val3 * 10 + val4);
                                });
                            } else {
                                obj.next.splice(i3, 1);
                            }
                        });
                    }
                    
                    if (!obj.next || !obj.next.length) {
                        obj.next.splice(i2, 1);
                    }
                });
            }
            
            if (!obj.next || !obj.next.length) {
                max.splice(i1, 1);
            }
        });
    
        if (!max.length) {
            [max, maxVal] = getPrevMax(board, maxVal);
        } else {
            ret = Math.max.apply(0, maxArr);
            break;
        }
    }
    
    console.log(ret);
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

function getNextValues(board, row, col, parentX = -1, parentY = -1) {
    const possiblePos = [
        [row, col - 1],
        [row, col + 1],
        [row + 1, col],
        [row - 1, col]
    ];

    let arr = [];

    const m = board.length || 0;
    const n = board[0].length;

    for (pos of possiblePos) {
        if ((parentX != pos[0] || parentY != pos[1]) && pos[0] >= 0 && pos[1] >= 0 && pos[0] < m && pos[1] < n) {
            arr.push({ row: pos[0], col: pos[1], val: board[pos[0]][pos[1]] });
        }
    }
    maxVal = Math.max.apply(0, arr.map(obj => obj.val));

    return arr.filter(obj => obj.val == maxVal);
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