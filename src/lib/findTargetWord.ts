import { colorize, type LetterColor } from './colorize';
import targetList from './targetList';

function shuffle(array: unknown[]) {
	let currentIndex = array.length;

	// While there remain elements to shuffle...
	while (currentIndex != 0) {
		// Pick a remaining element...
		const randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}
}

export function arraysEqual<T>(a: T[], b: T[]) {
	if (a === b) return true;
	if (a == null || b == null) return false;
	if (a.length !== b.length) return false;

	// If you don't care about the order of the elements inside
	// the array, you should sort both arrays here.
	// Please note that calling sort on an array will modify that array.
	// you might want to clone your array first.

	for (let i = 0; i < a.length; ++i) {
		if (Array.isArray(a[i])) {
			if (!arraysEqual(a[i] as unknown[], b[i] as unknown[])) return false;
		} else {
			if (a[i] !== b[i]) return false;
		}
	}
	return true;
}

function findTargetWord(pattern: LetterColor[][]) {
	shuffle(targetList);
	for (const target of targetList) {
		const words: string[] = [];
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
