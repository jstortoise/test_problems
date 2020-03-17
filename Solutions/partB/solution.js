class MissingLetters {
	GetMissingLetters(sentence) {
		let alphabets = sentence.replace(/[^a-zA-Z]+/g, '').toLowerCase();
		let dict = {};
		// make dict of alphatet keys
		'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => dict[c] = 0);

		for (let i = 0; i < alphabets.length; i++) {
			dict[alphabets.charAt(i)] = 1;
		}

		return Object.keys(dict).filter(k => dict[k] == 0).join('');
	}
}

const sentence = 'A quick  fox jumps over the lazy dog';
const missingLetters = new MissingLetters();

console.log(missingLetters.GetMissingLetters(sentence));