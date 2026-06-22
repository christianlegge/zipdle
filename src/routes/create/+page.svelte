<script lang="ts">
	import { type LetterColor } from '$lib/colorize';
	import findTargetWord from '$lib/findTargetWord';
	import { PersistedState } from 'runed';

	let paintingColor = $state<LetterColor>('green');
	let painting = $state(false);
	let pattern = $state<LetterColor[][]>([
		['black', 'black', 'black', 'black', 'black'],
		['black', 'black', 'black', 'black', 'black'],
		['black', 'black', 'black', 'black', 'black'],
		['black', 'black', 'black', 'black', 'black'],
		['black', 'black', 'black', 'black', 'black'],
		['black', 'black', 'black', 'black', 'black']
	]);
	let foundWords = $state<string[]>([]);
	let foundTarget = $state('');

	let savedWords = new PersistedState<{ pattern: LetterColor[][]; target: string }[]>('saved', []);
</script>

<svelte:document
	onmousedown={() => (painting = true)}
	onmouseup={() => (painting = false)}
	onwheel={(e: WheelEvent) => {
		if (e.deltaY > 0) {
			if (paintingColor === 'green') {
				paintingColor = 'yellow';
			} else if (paintingColor === 'yellow') {
				paintingColor = 'black';
			} else if (paintingColor === 'black') {
				paintingColor = 'green';
			}
		} else {
			if (paintingColor === 'green') {
				paintingColor = 'black';
			} else if (paintingColor === 'yellow') {
				paintingColor = 'green';
			} else if (paintingColor === 'black') {
				paintingColor = 'yellow';
			}
		}
	}}
/>

<div class="flex flex-col gap-1">
	{#each pattern as row, i (i)}
		<div class="flex flex-row gap-1">
			{#each row as color, j (j)}
				<div
					class="h-12 w-12 select-none"
					draggable="false"
					style:background-color={color}
					onmousemove={() => {
						if (painting) {
							pattern[i][j] = paintingColor;
						}
					}}
					onmousedown={() => (pattern[i][j] = paintingColor)}
				></div>
			{/each}
		</div>
	{/each}
</div>
<div class="mt-4 flex flex-row gap-2">
	{#each ['green', 'yellow', 'black'] as LetterColor[] as color (color)}
		<button
			class="h-10 w-10 cursor-pointer"
			style:background-color={color}
			style:border={color === paintingColor ? '2px solid red' : ''}
			onclick={() => (paintingColor = color)}
		>
		</button>
	{/each}
</div>
<button
	class="my-4 cursor-pointer rounded bg-slate-200 p-4 text-black"
	onclick={() => {
		try {
			const { words, target } = findTargetWord(pattern);
			foundWords = words;
			foundTarget = target;
		} catch (e: unknown) {
			foundTarget = e;
			foundWords = [];
		}
	}}>Find target</button
>
<div class="ml-2 flex flex-col">
	<span>{foundTarget}</span>
	<div class="ml-4 flex flex-col">
		{#each foundWords as word (word)}
			<span>{word}</span>
		{/each}
	</div>
</div>
{#if foundWords.length === 6}
	<button
		class="my-4 cursor-pointer rounded bg-slate-200 p-4 text-black"
		onclick={() => {
			savedWords.current.push({ pattern, target: foundTarget });
		}}>Save</button
	>
{/if}

<span class="block">Saved: {savedWords.current.length}</span>
<button
	class="my-4 cursor-pointer rounded bg-slate-200 p-4 text-black"
	onclick={() => {
		const text = JSON.stringify(savedWords.current);
		const filename = 'savedPatterns.json';
		const element = document.createElement('a');
		const blob = new Blob([text], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		element.setAttribute('href', url);
		element.setAttribute('download', filename);

		element.click();
	}}
	>Export saved
</button>
