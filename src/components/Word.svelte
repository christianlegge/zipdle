<script lang="ts">
	import Letter from './Letter.svelte';
	import { colorize, type LetterColor } from '$lib/colorize';
	import { Spring } from 'svelte/motion';

	let { word, target }: { word: string; target: string } = $props();

	let offset = new Spring(0, {
		stiffness: 0.5,
		damping: 0.1
	});

	let letterbinds = $state<ReturnType<typeof Letter>[]>([]);

	const colors = $derived(colorize(word, target));

	const letters = $derived(Array.from({ ...word.split(''), length: 5 }));

	const zipped: [string, LetterColor][] = $derived(letters.map((k, i) => [k, colors[i]]));

	export function error() {
		offset.target = -15;
		setTimeout(() => (offset.target = 0), 50);
	}

	export async function flip() {
		for (const l of letterbinds) {
			await l.flip();
		}
	}
</script>

<div class="flex flex-row gap-2" style={`translate: 0px ${offset.current}px`}>
	{#each zipped as [letter, color], i (i)}
		<Letter bind:this={letterbinds[i]} {letter} {color} />
	{/each}
</div>
