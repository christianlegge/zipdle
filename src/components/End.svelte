<script lang="ts">
	import { colorize, type LetterColor } from '$lib/colorize';
	import Pattern from './Pattern.svelte';

	let {
		words,
		target,
		pattern,
		toggleBoard,
		boardShown,
		persistScore,
		resetProgress
	}: {
		words: string[];
		target: string;
		pattern: LetterColor[][];
		toggleBoard: () => void;
		boardShown: boolean;
		persistScore: (score: number) => void;
		resetProgress: () => void;
	} = $props();

	const actualPattern = $derived(words.map((w) => colorize(w, target)));

	let copied = $state(false);
	let confirmReset = $state(false);

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
		persistScore(score / 30);
		return score / 30;
	}

	function emoji(pattern: LetterColor[][], targetPattern: LetterColor[][]) {
		const squares: Record<string, string> = {
			greengreen: '💚',
			yellowyellow: '💛',
			blackblack: '🖤',
			greenyellow: '🟢',
			greenblack: '🟩',
			yellowgreen: '🟡',
			yellowblack: '🟨',
			blackgreen: '⬛',
			blackyellow: '⬛'
		};
		return pattern
			.map((row, i) => row.map((square, j) => squares[square + targetPattern[i][j]]).join(''))
			.join('\n');
	}

	function copy(actual: LetterColor[][], target: LetterColor[][]) {
		const score = (similarity(actual, target) * 100).toFixed(2);
		navigator.clipboard
			.writeText(
				`I scored ${score}% on zipdle!\n${emoji(actual, target)}\nhttps://zipdle.christianlegge.dev`
			)
			.then(() => {
				copied = true;
				setTimeout(() => (copied = false), 3000);
			});
	}
</script>

<section
	class="{boardShown
		? 'relative'
		: 'absolute'} inset-0 mx-auto grid h-fit w-fit grid-cols-2 items-center justify-center gap-4 rounded bg-slate-500 px-8 pt-2 pb-8 md:col-span-2"
>
	<button
		class="col-span-2 inline-block w-full cursor-pointer rounded bg-slate-600 py-1 text-center text-xs uppercase"
		onclick={toggleBoard}>{boardShown ? '^ Hide Board ^' : 'V View Board V'}</button
	>
	<div class="col-span-2 w-full text-center">
		<h2 class="mb-2 text-xs uppercase">Similarity</h2>
		{(100 * similarity(actualPattern, pattern)).toFixed(2)}%
	</div>
	<div class="col-span-2 w-full text-center">
		<h2 class="mb-2 text-xs uppercase">Target word</h2>
		{target}
	</div>
	<div class="flex flex-col items-center gap-4">
		<h2 class="text-xs uppercase">Target Pattern</h2>
		<Pattern {pattern} />
	</div>
	<div class="flex flex-col items-center gap-4">
		<h2 class="text-xs uppercase">Your Result</h2>
		<Pattern pattern={actualPattern} target={pattern} />
	</div>
	<div class="col-span-2 mt-2 w-full text-center">
		<button
			class="{copied ? 'text-slate-500' : 'cursor-pointer text-slate-900'} rounded bg-slate-100 p-2"
			onclick={() => copy(actualPattern, pattern)}>{copied ? 'Copied!' : 'Share'}</button
		>
	</div>
	<div class="col-span-2 mt-2 w-full text-center">
		<button
			class="cursor-pointer rounded bg-red-900 p-2"
			onclick={confirmReset ? resetProgress : () => (confirmReset = true)}
			>{confirmReset ? 'Really try again?' : 'Try again'}</button
		>
	</div>
</section>
