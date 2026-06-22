import { colorize, type LetterColor } from './colorize';
import targetList from './targetList';
import wordList from './wordlist';

function arraysEqual<T>(a: T[], b: T[]) {
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length !== b.length) return false;

	// If you don't care about the order of the elements inside
	// the array, you should sort both arrays here.
	// Please note that calling sort on an array will modify that array.
	// you might want to clone your array first.

	for (let i = 0; i < a.length; ++i) {
		if (a[i] !== b[i]) return false;
	}
	return true;
}

function findTargetWord(pattern: LetterColor[][]) {
	for (let i = 0; i < 50; i++) {
		const words: string[] = [];
		const target = targetList[Math.floor(Math.random() * targetList.length)];
		console.log('trying', target);

		let rowSuccess = true;
		for (const row of pattern) {
			let success = false;
			for (const attempt of targetList) {
				if (words.includes(attempt)) {
					continue;
				}
				const color = colorize(attempt, target);
				if (arraysEqual(color, row)) {
					words.push(attempt);
					success = true;
					break;
				}
			}
			if (!success) {
				rowSuccess = false;
				break;
			}
		}
		if (rowSuccess) {
			return {
				words,
				target
			};
		}
	}

	throw new Error(`Could not find match in 50 attempts.`);
}

export default findTargetWord;
