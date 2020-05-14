function solution(S = '', X = [], Y = []) {
    const chList = S.split('');
    const dict = {};
    let maxDistance = 0;
    chList.forEach((ch, i) => {
        const distance = X[i] ** 2 + Y[i] ** 2;
        if (maxDistance < distance) {
            maxDistance = distance;
        }
        if (!dict[ch]) {
            dict[ch] = [distance];
        } else {
            dict[ch].push(distance);
        }
    });
    let hasSame = false;
    for (let ch in dict) {
        if (dict[ch].length > 1) {
            dict[ch] = dict[ch].sort((a, b) => a < b);
            maxDistance = Math.min(maxDistance, dict[ch][1]);
            hasSame = true;
        }
    }
    if (!hasSame) return S.length;
    let count = 0;
    for (let ch in dict) {
        dict[ch].forEach(val => {
            if (val < maxDistance) count++;
        });
    }
    return count;
}