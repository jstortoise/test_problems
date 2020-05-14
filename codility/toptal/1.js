function compress(S) {
    const n = S.length;
    let str = '';
    let count = 1, i = 0;
    while (i < n - 1) {
        const str1 = S.charAt(i);
        const str2 = S.charAt(i + 1);
        if (str1 == str2) {
            count++;
        } else {
            str += count > 1 ? (count + str1) : str1;
            count = 1;
        }
        i++;
    }
    str += count > 1 ? count + S.charAt(n - 1) : S.charAt(n - 1);
    return str;
}
function solution(S = '', K = 0) {
    const n = S.length;
    // K = 0
    if (K == 0) return compress(S).length;
    if (K >= S.length) return 0;
    // K > 1
    let len = compress(S).length;
    let i = 0;
    while (i < n - K + 1) {
        const s = compress(S.substr(0, i) + S.substr(i + K));
        if (s.length < len) {
            len = s.length;
        }
        i++;
    }
    return len;
}
const s = 'ABBBCCDDCCCE';
const k = 3;
const len = solution(s, k);
console.log(len);