<script lang="ts">
	import upcoming from '$lib/upcoming';
	import Pattern from '../../components/Pattern.svelte';
	import { SvelteDate } from 'svelte/reactivity';

	const today = new SvelteDate();

	function offsetDate(days: number) {
		const d = new SvelteDate(today);
		d.setDate(d.getDate() + days);
		return d;
	}
</script>

<div class="flex w-full flex-row flex-wrap gap-8">
	{#each upcoming as { pattern, target }, i (i)}
		<div class="flex flex-col items-center justify-center gap-2">
			<span>{offsetDate(i).toDateString()}</span>
			<span>{target}</span>
			<Pattern {pattern} />
		</div>
	{/each}
</div>
