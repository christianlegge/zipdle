<script lang="ts">
	import Word from './Word.svelte';
	import { fade } from 'svelte/transition';
	import wordList from '$lib/wordlist';
	import Pattern from './Pattern.svelte';
	import { SvelteDate } from 'svelte/reactivity';
	import upcoming from '$lib/upcoming';
	import End from './End.svelte';
	import Keyboard from './Keyboard.svelte';

	let { tutorialShown, date }: { tutorialShown: boolean; date: string } = $props();

	let words = $state<string[]>([]);
	let intermediate = $state('');
	let flipping = $state(false);
	let endBoardShown = $state(false);

	const START_DATE = new SvelteDate(2026, 5, 23);

	const now = new SvelteDate(`${date} 00:00`);

	const days = Math.floor((now.getTime() - START_DATE.getTime()) / (24 * 60 * 60 * 1000));

	const target = $derived(upcoming[days].target);
	const targetPattern = $derived(upcoming[days].pattern);

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
		<div class="flex flex-col items-center gap-2 rounded bg-slate-500 p-4">
			<span class="text-xs uppercase">{now.toDateString()}</span>
			<h2 class="mt-2 text-sm">Target Word</h2>
			<span class="text-lg">{target}</span>
		</div>
		<div class="flex flex-col items-center gap-4 rounded bg-slate-500 p-4">
			<Pattern pattern={targetPattern} />
		</div>
	</div>
</section>
{#if words.length !== 6}
	<Keyboard {processInput} />
{/if}
