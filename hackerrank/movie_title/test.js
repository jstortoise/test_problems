const https = require('https');
/*
 * Complete the function below.
 * Use console.log to print the result, you should not return from the function.
 * Base url: https://jsonmock.hackerrank.com/api/movies/search/?Title=
 */
function getMovieTitles(substr) {
    getMovies(substr, 1, data => {
        data.map(obj => obj.Title).sort().forEach(val => {
            console.log(val);
        });
    });
}

function getMovies(substr, page = 1, callback) {
    let url = `https://jsonmock.hackerrank.com/api/movies/search/?Title=${substr}&page=${page}`;
    https.get(url, result => {
        let ret = '';
        result.on('data', d => {
            ret += d;
        });
        result.on('end', () => {
            let data = JSON.parse(ret);
            if (data.total_pages > page) {
                getMovies(substr, page + 1, res => {
                    callback([...data.data, ...res]);
                });
            } else {
                callback(data.data);
            }
        });
    });
}

getMovieTitles('Fantastika');