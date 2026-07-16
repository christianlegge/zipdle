import type { LetterColor } from './colorize';
import { arraysEqual } from './findTargetWord';

const upcoming: { pattern: LetterColor[][]; target: string }[] = [
	{
		pattern: [
			['green', 'yellow', 'black', 'black', 'black'],
			['yellow', 'green', 'yellow', 'black', 'black'],
			['black', 'yellow', 'green', 'green', 'black'],
			['black', 'green', 'green', 'yellow', 'black'],
			['black', 'black', 'yellow', 'green', 'yellow'],
			['black', 'black', 'black', 'yellow', 'green']
		],
		target: 'media'
	},
	{
		pattern: [
			['green', 'green', 'green', 'black', 'black'],
			['black', 'black', 'yellow', 'yellow', 'yellow'],
			['green', 'green', 'green', 'black', 'black'],
			['black', 'black', 'yellow', 'yellow', 'yellow'],
			['green', 'green', 'green', 'black', 'black'],
			['black', 'black', 'yellow', 'yellow', 'yellow']
		],
		target: 'black'
	},
	{
		pattern: [
			['black', 'black', 'green', 'green', 'green'],
			['black', 'black', 'green', 'yellow', 'green'],
			['black', 'black', 'green', 'green', 'green'],
			['yellow', 'yellow', 'yellow', 'black', 'black'],
			['yellow', 'green', 'yellow', 'black', 'black'],
			['yellow', 'yellow', 'yellow', 'black', 'black']
		],
		target: 'elite'
	},
	{
		pattern: [
			['yellow', 'yellow', 'yellow', 'yellow', 'yellow'],
			['yellow', 'black', 'yellow', 'black', 'yellow'],
			['yellow', 'yellow', 'yellow', 'yellow', 'yellow'],
			['black', 'yellow', 'yellow', 'yellow', 'black'],
			['yellow', 'black', 'black', 'black', 'yellow'],
			['yellow', 'yellow', 'yellow', 'yellow', 'yellow']
		],
		target: 'spear'
	},
	{
		pattern: [
			['black', 'black', 'green', 'green', 'green'],
			['black', 'black', 'green', 'yellow', 'yellow'],
			['black', 'black', 'green', 'yellow', 'black'],
			['black', 'yellow', 'green', 'black', 'black'],
			['yellow', 'yellow', 'green', 'black', 'black'],
			['green', 'green', 'green', 'black', 'black']
		],
		target: 'crank'
	},
	{
		pattern: [
			['black', 'black', 'yellow', 'yellow', 'green'],
			['yellow', 'yellow', 'yellow', 'black', 'black'],
			['black', 'black', 'yellow', 'green', 'green'],
			['green', 'green', 'yellow', 'black', 'black'],
			['black', 'black', 'yellow', 'yellow', 'yellow'],
			['green', 'yellow', 'yellow', 'black', 'black']
		],
		target: 'terse'
	},
	{
		pattern: [
			['yellow', 'yellow', 'black', 'black', 'black'],
			['green', 'yellow', 'yellow', 'black', 'black'],
			['green', 'green', 'yellow', 'yellow', 'black'],
			['black', 'green', 'green', 'yellow', 'yellow'],
			['black', 'black', 'green', 'green', 'yellow'],
			['black', 'black', 'black', 'green', 'green']
		],
		target: 'spear'
	},
	{
		pattern: [
			['black', 'black', 'yellow', 'black', 'black'],
			['black', 'yellow', 'green', 'yellow', 'black'],
			['yellow', 'green', 'black', 'green', 'yellow'],
			['green', 'yellow', 'black', 'yellow', 'green'],
			['black', 'green', 'yellow', 'green', 'black'],
			['black', 'black', 'green', 'black', 'black']
		],
		target: 'ripen'
	},
	{
		pattern: [
			['yellow', 'yellow', 'black', 'yellow', 'yellow'],
			['yellow', 'black', 'black', 'black', 'yellow'],
			['black', 'green', 'black', 'green', 'black'],
			['black', 'yellow', 'black', 'yellow', 'black'],
			['green', 'black', 'black', 'black', 'green'],
			['green', 'green', 'black', 'green', 'green']
		],
		target: 'caper'
	},
	{
		pattern: [
			['black', 'green', 'yellow', 'green', 'black'],
			['black', 'green', 'green', 'green', 'black'],
			['black', 'green', 'yellow', 'green', 'black'],
			['black', 'yellow', 'green', 'yellow', 'black'],
			['black', 'yellow', 'yellow', 'yellow', 'black'],
			['black', 'yellow', 'green', 'yellow', 'black']
		],
		target: 'brood'
	},
	{
		pattern: [
			['black', 'green', 'green', 'green', 'black'],
			['green', 'black', 'yellow', 'black', 'green'],
			['black', 'yellow', 'green', 'yellow', 'black'],
			['black', 'green', 'yellow', 'green', 'black'],
			['yellow', 'black', 'green', 'black', 'yellow'],
			['black', 'yellow', 'yellow', 'yellow', 'black']
		],
		target: 'bloat'
	},
	{
		pattern: [
			['yellow', 'green', 'yellow', 'black', 'black'],
			['black', 'yellow', 'green', 'yellow', 'black'],
			['black', 'black', 'yellow', 'green', 'yellow'],
			['black', 'black', 'yellow', 'green', 'yellow'],
			['black', 'yellow', 'green', 'yellow', 'black'],
			['yellow', 'green', 'yellow', 'black', 'black']
		],
		target: 'board'
	},
	{
		pattern: [
			['green', 'black', 'green', 'black', 'green'],
			['black', 'green', 'black', 'green', 'black'],
			['black', 'black', 'green', 'black', 'black'],
			['black', 'black', 'yellow', 'black', 'black'],
			['black', 'yellow', 'black', 'yellow', 'black'],
			['yellow', 'black', 'yellow', 'black', 'yellow']
		],
		target: 'elect'
	},
	{
		pattern: [
			['yellow', 'black', 'green', 'black', 'yellow'],
			['black', 'yellow', 'green', 'yellow', 'black'],
			['black', 'green', 'yellow', 'green', 'black'],
			['black', 'yellow', 'green', 'yellow', 'black'],
			['black', 'green', 'yellow', 'green', 'black'],
			['green', 'black', 'yellow', 'black', 'green']
		],
		target: 'fetal'
	},
	{
		pattern: [
			['green', 'black', 'yellow', 'black', 'green'],
			['green', 'black', 'yellow', 'black', 'green'],
			['green', 'black', 'yellow', 'black', 'green'],
			['black', 'green', 'yellow', 'green', 'black'],
			['black', 'green', 'yellow', 'green', 'black'],
			['black', 'green', 'yellow', 'green', 'black']
		],
		target: 'title'
	},
	{
		pattern: [
			['black', 'black', 'black', 'black', 'yellow'],
			['black', 'black', 'black', 'yellow', 'green'],
			['black', 'black', 'yellow', 'green', 'green'],
			['black', 'yellow', 'green', 'green', 'yellow'],
			['yellow', 'green', 'green', 'yellow', 'black'],
			['green', 'green', 'yellow', 'black', 'black']
		],
		target: 'plied'
	},
	{
		pattern: [
			['yellow', 'green', 'black', 'black', 'black'],
			['black', 'yellow', 'green', 'black', 'black'],
			['black', 'black', 'yellow', 'green', 'black'],
			['black', 'black', 'yellow', 'green', 'black'],
			['black', 'yellow', 'green', 'black', 'black'],
			['yellow', 'green', 'black', 'black', 'black']
		],
		target: 'cider'
	},
	{
		pattern: [
			['yellow', 'black', 'black', 'black', 'yellow'],
			['yellow', 'green', 'yellow', 'green', 'yellow'],
			['black', 'green', 'black', 'green', 'black'],
			['black', 'yellow', 'black', 'yellow', 'black'],
			['black', 'yellow', 'green', 'yellow', 'black'],
			['black', 'yellow', 'black', 'yellow', 'black']
		],
		target: 'roost'
	},
	{
		pattern: [
			['yellow', 'yellow', 'black', 'yellow', 'yellow'],
			['black', 'green', 'green', 'green', 'black'],
			['black', 'green', 'yellow', 'green', 'black'],
			['black', 'green', 'yellow', 'green', 'black'],
			['black', 'green', 'green', 'green', 'black'],
			['yellow', 'yellow', 'black', 'yellow', 'yellow']
		],
		target: 'sedan'
	},
	{
		pattern: [
			['green', 'green', 'black', 'green', 'green'],
			['black', 'yellow', 'yellow', 'yellow', 'black'],
			['black', 'yellow', 'green', 'yellow', 'black'],
			['black', 'yellow', 'green', 'yellow', 'black'],
			['black', 'yellow', 'yellow', 'yellow', 'black'],
			['green', 'green', 'black', 'green', 'green']
		],
		target: 'blond'
	},
	{
		pattern: [
			['black', 'black', 'yellow', 'black', 'black'],
			['black', 'yellow', 'yellow', 'yellow', 'black'],
			['yellow', 'yellow', 'yellow', 'yellow', 'yellow'],
			['black', 'green', 'green', 'green', 'black'],
			['black', 'green', 'yellow', 'green', 'black'],
			['black', 'green', 'yellow', 'green', 'black']
		],
		target: 'sonar'
	},
	{
		pattern: [
			['black', 'yellow', 'yellow', 'black', 'green'],
			['black', 'yellow', 'black', 'yellow', 'green'],
			['black', 'yellow', 'green', 'green', 'black'],
			['black', 'green', 'green', 'yellow', 'black'],
			['green', 'yellow', 'black', 'yellow', 'black'],
			['green', 'black', 'yellow', 'yellow', 'black']
		],
		target: 'chain'
	},
	{
		pattern: [
			['black', 'yellow', 'green', 'black', 'black'],
			['black', 'black', 'yellow', 'green', 'black'],
			['black', 'black', 'black', 'yellow', 'green'],
			['black', 'black', 'black', 'yellow', 'green'],
			['black', 'black', 'yellow', 'green', 'black'],
			['black', 'yellow', 'green', 'black', 'black']
		],
		target: 'covey'
	},
	{
		pattern: [
			['black', 'black', 'green', 'black', 'black'],
			['green', 'black', 'yellow', 'black', 'green'],
			['black', 'green', 'yellow', 'green', 'black'],
			['black', 'green', 'yellow', 'green', 'black'],
			['green', 'black', 'yellow', 'black', 'green'],
			['black', 'black', 'green', 'black', 'black']
		],
		target: 'tenet'
	},
	{
		pattern: [
			['yellow', 'yellow', 'yellow', 'yellow', 'yellow'],
			['black', 'green', 'black', 'green', 'black'],
			['black', 'black', 'green', 'black', 'black'],
			['black', 'black', 'yellow', 'black', 'black'],
			['black', 'yellow', 'black', 'yellow', 'black'],
			['yellow', 'yellow', 'yellow', 'yellow', 'yellow']
		],
		target: 'voter'
	},
	{
		pattern: [
			['yellow', 'yellow', 'yellow', 'yellow', 'yellow'],
			['green', 'black', 'black', 'black', 'black'],
			['green', 'green', 'black', 'black', 'black'],
			['green', 'green', 'green', 'black', 'black'],
			['green', 'green', 'green', 'green', 'black'],
			['green', 'green', 'green', 'green', 'green']
		],
		target: 'canoe'
	},
	{
		pattern: [
			['black', 'green', 'green', 'green', 'black'],
			['green', 'black', 'green', 'black', 'green'],
			['black', 'green', 'green', 'green', 'black'],
			['yellow', 'yellow', 'yellow', 'yellow', 'yellow'],
			['black', 'yellow', 'yellow', 'yellow', 'black'],
			['black', 'yellow', 'black', 'yellow', 'black']
		],
		target: 'route'
	},
	{
		pattern: [
			['yellow', 'yellow', 'black', 'yellow', 'yellow'],
			['yellow', 'black', 'black', 'black', 'yellow'],
			['black', 'green', 'black', 'green', 'black'],
			['black', 'yellow', 'black', 'yellow', 'black'],
			['green', 'black', 'black', 'black', 'green'],
			['green', 'green', 'black', 'green', 'green']
		],
		target: 'champ'
	},
	{
		pattern: [
			['green', 'yellow', 'black', 'black', 'black'],
			['black', 'green', 'yellow', 'black', 'black'],
			['black', 'black', 'green', 'yellow', 'black'],
			['black', 'black', 'green', 'yellow', 'black'],
			['black', 'green', 'yellow', 'black', 'black'],
			['green', 'yellow', 'black', 'black', 'black']
		],
		target: 'mouse'
	},
	{
		pattern: [
			['black', 'black', 'black', 'black', 'green'],
			['black', 'black', 'black', 'green', 'black'],
			['black', 'black', 'green', 'black', 'black'],
			['yellow', 'green', 'yellow', 'yellow', 'yellow'],
			['green', 'yellow', 'yellow', 'yellow', 'yellow'],
			['yellow', 'yellow', 'yellow', 'yellow', 'yellow']
		],
		target: 'terse'
	},
	{
		pattern: [
			['black', 'black', 'yellow', 'black', 'black'],
			['black', 'green', 'black', 'green', 'black'],
			['green', 'black', 'yellow', 'black', 'green'],
			['yellow', 'black', 'green', 'black', 'yellow'],
			['black', 'yellow', 'black', 'yellow', 'black'],
			['black', 'black', 'green', 'black', 'black']
		],
		target: 'panes'
	},
	{
		pattern: [
			['yellow', 'green', 'black', 'black', 'black'],
			['black', 'yellow', 'green', 'black', 'black'],
			['black', 'black', 'yellow', 'green', 'black'],
			['black', 'black', 'green', 'yellow', 'black'],
			['black', 'green', 'yellow', 'black', 'black'],
			['green', 'yellow', 'black', 'black', 'black']
		],
		target: 'burly'
	},
	{
		pattern: [
			['black', 'yellow', 'black', 'green', 'green'],
			['black', 'black', 'yellow', 'black', 'black'],
			['green', 'green', 'black', 'yellow', 'black'],
			['yellow', 'yellow', 'black', 'green', 'black'],
			['black', 'black', 'green', 'black', 'black'],
			['black', 'green', 'black', 'yellow', 'yellow']
		],
		target: 'pries'
	},
	{
		pattern: [
			['black', 'green', 'black', 'yellow', 'black'],
			['black', 'yellow', 'black', 'green', 'black'],
			['black', 'black', 'yellow', 'green', 'black'],
			['black', 'green', 'yellow', 'black', 'black'],
			['black', 'green', 'black', 'yellow', 'black'],
			['black', 'yellow', 'black', 'green', 'black']
		],
		target: 'weird'
	},
	{
		pattern: [
			['black', 'black', 'black', 'black', 'green'],
			['black', 'black', 'black', 'green', 'green'],
			['black', 'green', 'green', 'green', 'black'],
			['black', 'yellow', 'yellow', 'yellow', 'black'],
			['yellow', 'yellow', 'black', 'black', 'black'],
			['yellow', 'black', 'black', 'black', 'black']
		],
		target: 'plain'
	},
	{
		pattern: [
			['yellow', 'black', 'green', 'black', 'black'],
			['black', 'yellow', 'green', 'black', 'black'],
			['black', 'black', 'green', 'yellow', 'black'],
			['black', 'black', 'green', 'black', 'yellow'],
			['yellow', 'yellow', 'green', 'black', 'black'],
			['black', 'black', 'green', 'yellow', 'yellow']
		],
		target: 'ferry'
	},
	{
		pattern: [
			['yellow', 'green', 'black', 'black', 'black'],
			['yellow', 'green', 'yellow', 'black', 'black'],
			['black', 'green', 'yellow', 'yellow', 'black'],
			['black', 'green', 'black', 'yellow', 'yellow'],
			['black', 'green', 'black', 'black', 'black'],
			['yellow', 'green', 'yellow', 'yellow', 'yellow']
		],
		target: 'learn'
	},
	{
		pattern: [
			['green', 'yellow', 'black', 'black', 'black'],
			['green', 'black', 'yellow', 'black', 'black'],
			['green', 'yellow', 'yellow', 'black', 'black'],
			['green', 'black', 'black', 'yellow', 'black'],
			['green', 'black', 'yellow', 'yellow', 'black'],
			['green', 'black', 'black', 'black', 'yellow']
		],
		target: 'adopt'
	},
	{
		pattern: [
			['black', 'black', 'black', 'yellow', 'green'],
			['black', 'black', 'yellow', 'yellow', 'green'],
			['black', 'yellow', 'black', 'black', 'green'],
			['yellow', 'yellow', 'black', 'black', 'green'],
			['black', 'black', 'black', 'black', 'green'],
			['yellow', 'yellow', 'yellow', 'yellow', 'green']
		],
		target: 'mates'
	},
	{
		pattern: [
			['yellow', 'yellow', 'yellow', 'yellow', 'yellow'],
			['green', 'yellow', 'yellow', 'yellow', 'yellow'],
			['yellow', 'green', 'yellow', 'yellow', 'yellow'],
			['black', 'black', 'green', 'black', 'black'],
			['black', 'black', 'black', 'green', 'black'],
			['black', 'black', 'black', 'black', 'green']
		],
		target: 'lapse'
	},
	{
		pattern: [
			['black', 'black', 'black', 'yellow', 'green'],
			['black', 'black', 'black', 'green', 'yellow'],
			['yellow', 'yellow', 'yellow', 'black', 'black'],
			['black', 'black', 'yellow', 'yellow', 'yellow'],
			['yellow', 'green', 'black', 'black', 'black'],
			['green', 'yellow', 'black', 'black', 'black']
		],
		target: 'joint'
	},
	{
		pattern: [
			['black', 'green', 'yellow', 'black', 'yellow'],
			['green', 'yellow', 'black', 'black', 'yellow'],
			['black', 'green', 'yellow', 'black', 'black'],
			['green', 'yellow', 'black', 'black', 'black'],
			['black', 'green', 'yellow', 'black', 'green'],
			['green', 'yellow', 'black', 'black', 'green']
		],
		target: 'parks'
	},
	{
		pattern: [
			['black', 'black', 'yellow', 'black', 'black'],
			['black', 'green', 'black', 'yellow', 'black'],
			['black', 'yellow', 'black', 'green', 'black'],
			['green', 'black', 'black', 'black', 'yellow'],
			['yellow', 'yellow', 'yellow', 'yellow', 'yellow'],
			['yellow', 'black', 'black', 'black', 'green']
		],
		target: 'tomes'
	},
	{
		pattern: [
			['green', 'yellow', 'yellow', 'black', 'black'],
			['green', 'black', 'black', 'yellow', 'black'],
			['green', 'green', 'yellow', 'black', 'black'],
			['green', 'black', 'black', 'yellow', 'black'],
			['green', 'black', 'black', 'green', 'black'],
			['green', 'yellow', 'green', 'black', 'black']
		],
		target: 'baton'
	},
	{
		pattern: [
			['black', 'green', 'yellow', 'yellow', 'black'],
			['green', 'yellow', 'black', 'black', 'yellow'],
			['yellow', 'green', 'black', 'black', 'black'],
			['green', 'yellow', 'black', 'black', 'black'],
			['yellow', 'green', 'black', 'black', 'yellow'],
			['black', 'yellow', 'green', 'yellow', 'black']
		],
		target: 'curio'
	},
	{
		pattern: [
			['black', 'green', 'yellow', 'black', 'black'],
			['black', 'green', 'black', 'yellow', 'black'],
			['black', 'green', 'black', 'black', 'yellow'],
			['black', 'yellow', 'black', 'black', 'green'],
			['black', 'yellow', 'black', 'green', 'black'],
			['black', 'yellow', 'green', 'black', 'black']
		],
		target: 'split'
	},
	{
		pattern: [
			['green', 'yellow', 'yellow', 'yellow', 'yellow'],
			['yellow', 'yellow', 'black', 'black', 'black'],
			['green', 'yellow', 'yellow', 'yellow', 'black'],
			['yellow', 'green', 'black', 'black', 'black'],
			['green', 'yellow', 'black', 'black', 'black'],
			['yellow', 'green', 'yellow', 'yellow', 'yellow']
		],
		target: 'sonic'
	},
	{
		pattern: [
			['green', 'yellow', 'yellow', 'yellow', 'yellow'],
			['yellow', 'green', 'black', 'black', 'black'],
			['green', 'yellow', 'yellow', 'yellow', 'black'],
			['yellow', 'yellow', 'black', 'black', 'black'],
			['green', 'yellow', 'black', 'black', 'black'],
			['green', 'green', 'black', 'black', 'black']
		],
		target: 'gazer'
	},
	{
		pattern: [
			['black', 'yellow', 'green', 'yellow', 'black'],
			['yellow', 'green', 'black', 'black', 'yellow'],
			['green', 'yellow', 'black', 'black', 'black'],
			['yellow', 'green', 'black', 'yellow', 'yellow'],
			['green', 'yellow', 'black', 'yellow', 'yellow'],
			['black', 'green', 'yellow', 'yellow', 'black']
		],
		target: 'leans'
	},
	{
		pattern: [
			['green', 'yellow', 'black', 'black', 'yellow'],
			['yellow', 'green', 'black', 'black', 'yellow'],
			['yellow', 'yellow', 'yellow', 'yellow', 'yellow'],
			['green', 'yellow', 'black', 'black', 'green'],
			['yellow', 'green', 'black', 'black', 'green'],
			['yellow', 'yellow', 'black', 'black', 'green']
		],
		target: 'slope'
	},
	{
		pattern: [
			['green', 'yellow', 'yellow', 'yellow', 'yellow'],
			['black', 'green', 'yellow', 'black', 'black'],
			['black', 'yellow', 'green', 'black', 'black'],
			['black', 'yellow', 'yellow', 'black', 'black'],
			['black', 'green', 'green', 'black', 'black'],
			['yellow', 'yellow', 'yellow', 'yellow', 'green']
		],
		target: 'means'
	},
	{
		pattern: [
			['green', 'yellow', 'yellow', 'yellow', 'yellow'],
			['black', 'black', 'yellow', 'yellow', 'black'],
			['black', 'black', 'yellow', 'green', 'black'],
			['black', 'black', 'green', 'yellow', 'black'],
			['green', 'black', 'yellow', 'yellow', 'black'],
			['black', 'green', 'yellow', 'yellow', 'black']
		],
		target: 'paler'
	},
	{
		pattern: [
			['green', 'yellow', 'black', 'black', 'green'],
			['yellow', 'green', 'black', 'green', 'black'],
			['yellow', 'yellow', 'green', 'black', 'black'],
			['green', 'yellow', 'black', 'yellow', 'black'],
			['yellow', 'green', 'black', 'black', 'yellow'],
			['yellow', 'yellow', 'black', 'black', 'yellow']
		],
		target: 'solid'
	},
	{
		pattern: [
			['green', 'green', 'black', 'black', 'black'],
			['yellow', 'yellow', 'black', 'black', 'black'],
			['yellow', 'green', 'black', 'black', 'black'],
			['green', 'yellow', 'black', 'black', 'black'],
			['green', 'yellow', 'black', 'black', 'green'],
			['green', 'yellow', 'yellow', 'yellow', 'green']
		],
		target: 'meaty'
	}
];

const deduped: typeof upcoming = [];

for (const { pattern, target } of upcoming) {
	if (!deduped.find((x) => x.target === target && arraysEqual(x.pattern, pattern))) {
		deduped.push({ pattern, target });
	}
}

if (deduped.length !== upcoming.length) {
	console.log(JSON.stringify(deduped));
}

export default deduped;
