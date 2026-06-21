<script lang="ts">
	import { colorize, type LetterColor } from '$lib/colorize';
	import { fade } from 'svelte/transition';
	import Pattern from './Pattern.svelte';

	let { words, target, pattern }: { words: string[]; target: string; pattern: LetterColor[][] } =
		$props();

	const actualPattern = $derived(words.map((w) => colorize(w, target)));

	function similarity(actual: LetterColor[][], target: LetterColor[][]) {
		let score = 0;
		for (let i = 0; i < 6; i++) {
			for (let j = 0; j < 5; j++) {
				if (actual[i][j] === target[i][j]) {
					score += 1;
				} else if (actual[i][j] !== 'black' && target[i][j] !== 'black') {
					score += 0.5;
				}
			}
		}
		return score / 30;
	}

	function emoji(pattern: LetterColor[][]) {
		const squares: Record<LetterColor, string> = {
			green: '🟩',
			yellow: '🟨',
			black: '⬛',
			white: '⬜️'
		};
		return pattern.map((row) => row.map((square) => squares[square]).join('')).join('\n');
	}

	function copy(actual: LetterColor[][], target: LetterColor[][]) {
		const score = (similarity(actual, target) * 100).toFixed(2);
		navigator.clipboard.writeText(
			`I scored ${score}% on zipdle!\n${emoji(actual)}\nhttps://zipdle.christianlegge.dev`
		);
	}
</script>

<section
	transition:fade
	class="mx-auto grid w-fit grid-cols-2 items-center justify-center gap-4 rounded bg-slate-500 p-8 md:col-span-2"
>
	<div class="col-span-2 w-full text-center">
		<h2 class="mb-2 text-xs uppercase">Similarity</h2>
		{(100 * similarity(actualPattern, pattern)).toFixed(2)}%
	</div>
	<div class="flex flex-col items-center gap-4">
		<h2 class="text-xs uppercase">Target Pattern</h2>
		<Pattern {pattern} />
	</div>
	<div class="flex flex-col items-center gap-4">
		<h2 class="text-xs uppercase">Your Result</h2>
		<Pattern pattern={actualPattern} />
	</div>
	<div class="col-span-2 w-full text-center">
		<button
			class="cursor-pointer rounded bg-slate-100 p-2 text-slate-900"
			onclick={() => copy(actualPattern, pattern)}>Share</button
		>
	</div>
</section>
