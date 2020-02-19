function codingScoreReport(scores) {
    let levels = {
        Elite: 0,
        Excellent: 0,
        Good: 0,
        Fair: 0,
        Poor: 0
    };

    for (let score of scores) {
        if (300 <= score && score <= 599) {
            levels['Poor']++;
        } else if (600 <= score && score <= 699) {
            levels['Fair']++;
        } else if (700 <= score && score <= 749) {
            levels['Good']++;
        } else if (750 <= score && score <= 799) {
            levels['Excellent']++;
        } else if (800 <= score) {
            levels['Elite']++;
        }
    }

    return Object.keys(levels).filter(l => levels[l] > 0).sort((a, b) => levels[b] - levels[a]).map(l => `${l} - ${levels[l]}`);
}
