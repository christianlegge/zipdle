export type LetterColor = 'white' | 'green' | 'yellow' | 'black';

export const colors = {
	green: '#00aa00',
	yellow: '#aaaa00',
	white: '#cccccc',
	black: '#333333'
};

export function colorize(word: string, target: string): LetterColor[] {
	if (word.length !== 5 || target.length !== 5) {
		return ['white', 'white', 'white', 'white', 'white'];
	}

	const colors: ReturnType<typeof colorize> = ['black', 'black', 'black', 'black', 'black'];
	const seenLetters: Record<string, number> = target.split('').reduce(
		(a, v) => ({
			...a,
			[v]: 0
		}),
		{}
	);

	for (let i = 0; i < 5; i++) {
		if (word.charAt(i) === target.charAt(i)) {
			colors[i] = 'green';
			seenLetters[word.charAt(i)]++;
		}
	}

	for (let i = 0; i < 5; i++) {
		if (!target.includes(word.charAt(i))) {
			colors[i] = 'black';
		} else {
			const numMatches = target.split('').filter((c) => word.charAt(i) === c).length;
			if (colors[i] !== 'green' && seenLetters[word.charAt(i)] < numMatches) {
				colors[i] = 'yellow';
				seenLetters[word.charAt(i)]++;
			}
		}
	}

	return colors;
}
