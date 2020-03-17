const fs = require('fs');
const readline = require('readline');

const readFile = async () => {
    const fileStream = fs.createReadStream('triangle.txt');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let arr = [];
    for await (const line of rl) {
        let nums = line.split(' ').filter(val => val != '').map(val => parseInt(val));
        arr.push(nums);
    }

    return arr;
};

/**
 * Get maximum total
 * @param {Array} numArr e.g. [[0], [1, 2], [1, 2, 3], ..., [...]]
 */
const getMaxTotal = numArr => {
    const total = numArr.reduceRight((prevRow, curRow) => (
        curRow.map((val, index) => (
            val + (prevRow.length > 0 ? Math.max(prevRow[index], prevRow[index + 1]) : 0))
        )
    ), []);
    
    return total[0];
};

const main = async () => {
    // Read array from file
    const numArr = await readFile();

    // Get maximum total
    const total = getMaxTotal(numArr);

    console.log(total);
};

main();