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
