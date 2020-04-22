function calc(n) {
    const primes = [];
    let prime = 2;
    while (n > 1) {
        if (n % prime == 0) {
            primes.push(prime);
            n = n / prime;
        } else {
            prime++;
        }
    }
    return primes.join('*');
}

console.log(calc(9999999));