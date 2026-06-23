<script lang="ts">
	import Word from './Word.svelte';
	import { fade } from 'svelte/transition';
	import wordList from '$lib/wordlist';
	import { type LetterColor } from '$lib/colorize';
	import Pattern from './Pattern.svelte';
	import End from './End.svelte';
	import Keyboard from './Keyboard.svelte';

	let {
		target,
		targetPattern,
		tutorialShown
	}: { target: string; targetPattern: LetterColor[][]; tutorialShown: boolean } = $props();

	let words = $state<string[]>([]);
	let intermediate = $state('');
	let flipping = $state(false);
	let endBoardShown = $state(false);

	let wordbinds = $state<ReturnType<typeof Word>[]>([]);

	function onkeydown(event: KeyboardEvent) {
		// processInput(event.key);
		const el = document.getElementById(
			event.key.length === 1 ? event.key.toUpperCase() : event.key
		);
		if (el) {
			el.click();
			el.classList.add('active');
		}
	}

	function onkeyup(event: KeyboardEvent) {
		const el = document.getElementById(
			event.key.length === 1 ? event.key.toUpperCase() : event.key
		);
		if (el) {
			el.classList.remove('active');
		}
	}

	function processInput(key: string) {
		if (flipping) {
			return;
		}
		if (words.length >= 6) {
			return;
		}
		if (/^[A-Za-z]$/.test(key)) {
			if (intermediate.length < 5) {
				intermediate = `${intermediate}${key.toLowerCase()}`;
			} else {
				intermediate = `${intermediate.slice(0, 4)}${key.toLowerCase()}`;
			}
		} else if (key === 'Backspace') {
			intermediate = intermediate.slice(0, -1);
		} else if (key === 'Enter') {
			if (wordList.includes(intermediate) && !words.includes(intermediate)) {
				flipping = true;
				wordbinds[words.length].flip().then(() => {
					words = [...words, intermediate];
					intermediate = '';
					flipping = false;
				});
			} else {
				wordbinds[words.length].error();
			}
		}
	}

	let displayWords = $derived(
		[
			...words.filter((w) => w.length > 0),
			intermediate,
			...(words.length < 5 ? Array(5 - words.length).fill('') : [])
		].slice(0, 6)
	);
</script>

<svelte:document {onkeydown} {onkeyup} />

{#if words.length === 6 && !tutorialShown}
	<End
		{words}
		{target}
		pattern={targetPattern}
		boardShown={endBoardShown}
		toggleBoard={() => (endBoardShown = !endBoardShown)}
	/>
{/if}
<section
	transition:fade
	class="{words.length === 6 && endBoardShown ? 'col-span-2 mx-auto' : ''} {tutorialShown ||
	(words.length === 6 && !endBoardShown)
		? 'hidden'
		: 'flex'} row-start-2 flex-col items-center md:row-start-1 md:items-end"
>
	<div class="flex flex-col md:gap-2">
		{#each displayWords as word, i (i)}
			<Word bind:this={wordbinds[i]} {word} {target} targetPattern={targetPattern[i]} />
		{/each}
	</div>
</section>
<section
	class="{tutorialShown || words.length === 6
		? 'hidden'
		: 'flex'} flex-col items-center md:items-start"
>
	<div
		class="{tutorialShown
			? 'hidden'
			: 'flex'} flex-row items-center gap-8 rounded md:flex-col md:bg-slate-300 md:p-8"
	>
		<div class="flex flex-col items-center gap-4 rounded bg-slate-500 p-4">
			<h2 class="text-xs uppercase">Target Word</h2>
			<span>{target}</span>
		</div>
		<div class="flex flex-col items-center gap-4 rounded bg-slate-500 p-4">
			<Pattern pattern={targetPattern} />
		</div>
	</div>
</section>
{#if words.length !== 6}
	<Keyboard {processInput} />
{/if}
