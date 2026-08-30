import type { LetterColor } from './colorize';
import upcoming from './upcoming';
import findTargetWord from './findTargetWord';
import Rand from 'rand-seed';

function generateValidGame(seed: string): { target: string; targetPattern: LetterColor[][] } {
	const rand = new Rand(seed);
	let target;
	let pattern: LetterColor[][];

	while (true) {
		pattern = [];
		for (let i = 0; i < 6; i++) {
			pattern.push([]);
			for (let j = 0; j < 5; j++) {
				const r = rand.next();
				pattern[i].push(r > 0.5 ? 'black' : r > 0.2 ? 'yellow' : 'green');
			}
		}
		try {
			target = findTargetWord(pattern, seed).target;
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (_) {
			continue;
		}
		break;
	}

	return { target, targetPattern: pattern };
}

function getGameForDate(date: string): { target: string; targetPattern: LetterColor[][] } {
	const START_DATE = new Date(2026, 5, 23);

	const now = new Date(`${date} 00:00`);

	const days = Math.floor((now.getTime() - START_DATE.getTime()) / (24 * 60 * 60 * 1000));

	if (upcoming[days]) {
		return {
			target: upcoming[days].target,
			targetPattern: upcoming[days].pattern
		};
	}

	return generateValidGame(date);
}

export default getGameForDate;
