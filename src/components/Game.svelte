<script lang="ts">
	import Word from './Word.svelte';
	import wordList from '$lib/wordlist';
	import Pattern from './Pattern.svelte';
	import { SvelteDate } from 'svelte/reactivity';
	import upcoming from '$lib/upcoming';
	import End from './End.svelte';
	import Keyboard from './Keyboard.svelte';
	import { gameState, resetState } from '$lib/gameState.svelte';

	resetState();

	let { date }: { date: string } = $props();

	const START_DATE = new SvelteDate(2026, 5, 23);

	const now = $derived(new SvelteDate(`${date} 00:00`));

	const days = $derived(Math.floor((now.getTime() - START_DATE.getTime()) / (24 * 60 * 60 * 1000)));

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
		if (gameState.flipping) {
			return;
		}
		if (gameState.words.length >= 6) {
			return;
		}
		if (/^[A-Za-z]$/.test(key)) {
			if (gameState.intermediate.length < 5) {
				gameState.intermediate = `${gameState.intermediate}${key.toLowerCase()}`;
			} else {
				gameState.intermediate = `${gameState.intermediate.slice(0, 4)}${key.toLowerCase()}`;
			}
		} else if (key === 'Backspace') {
			gameState.intermediate = gameState.intermediate.slice(0, -1);
		} else if (key === 'Enter') {
			if (
				wordList.includes(gameState.intermediate) &&
				!gameState.words.includes(gameState.intermediate)
			) {
				gameState.flipping = true;
				wordbinds[gameState.words.length].flip().then(() => {
					gameState.words = [...gameState.words, gameState.intermediate];
					gameState.intermediate = '';
					gameState.flipping = false;
				});
			} else {
				wordbinds[gameState.words.length].error();
			}
		}
	}

	let displaywords = $derived(
		[
			...gameState.words.filter((w) => w.length > 0),
			gameState.intermediate,
			...(gameState.words.length < 5 ? Array(5 - gameState.words.length).fill('') : [])
		].slice(0, 6)
	);
</script>

<svelte:document {onkeydown} {onkeyup} />

{#if gameState.words.length === 6}
	<End
		words={gameState.words}
		{target}
		pattern={targetPattern}
		boardShown={gameState.endBoardShown}
		toggleBoard={() => (gameState.endBoardShown = !gameState.endBoardShown)}
	/>
{/if}
<section
	class="{gameState.words.length === 6 && gameState.endBoardShown
		? 'col-span-2 mx-auto'
		: ''} {gameState.words.length === 6 && !gameState.endBoardShown
		? 'hidden'
		: 'flex'} row-start-2 flex-col items-center md:row-start-1 md:items-end"
>
	<div class="flex flex-col md:gap-2">
		{#each displaywords as word, i (i)}
			<Word
				bind:this={wordbinds[i]}
				{word}
				{target}
				targetPattern={targetPattern[i]}
				preflip={i < gameState.words.length}
			/>
		{/each}
	</div>
</section>
<section
	class="{gameState.words.length === 6 ? 'hidden' : 'flex'} flex-col items-center md:items-start"
>
	<div class="flex flex-row items-center gap-8 rounded md:flex-col md:bg-slate-300 md:p-8">
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
{#if gameState.words.length !== 6}
	<Keyboard {processInput} />
{/if}
