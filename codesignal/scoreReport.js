function codingScoreReport(scores) {
    let result = {}, resArr = [];

    for (let score of scores) {
        if (score >= 800) {
            result.Elite = result.Elite ? result.Elite + 1 : 1;
        } else if (score >= 750) {
            result.Excellent = result.Excellent ? result.Excellent + 1 : 1;
        } else if (score >= 700) {
            result.Good = result.Good ? result.Good + 1 : 1;
        } else if (score >= 600) {
            result.Fair = result.Fair ? result.Fair + 1 : 1;
        } else if (score >= 300) {
            result.Poor = result.Poor ? result.Poor + 1 : 1;
        }
    }
    
    for (let key in result) {
        resArr.push([key, result[key]]);
    }

    let ret = [], levelOrder = ['Elite', 'Excellent', 'Good', 'Fair', 'Poor'];

    resArr.sort((a, b) => (b[1] > a[1]) || ((b[1] == a[1]) && (levelOrder.indexOf(b[0]) < levelOrder.indexOf(a[0]))));

    for (let score of resArr) {
        ret.push(score.join(' - '));
    }

    return ret;
}
