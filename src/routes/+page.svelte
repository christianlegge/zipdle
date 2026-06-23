<script lang="ts">
	import Game from '../components/Game.svelte';
	import Tutorial from '../components/Tutorial.svelte';
	import { PersistedState } from 'runed';
	import upcoming from '$lib/upcoming';
	import { SvelteDate } from 'svelte/reactivity';

	let closedTutorial = new PersistedState('visited', false);

	let manualTutorial = $state(false);

	const START_DATE = new SvelteDate(2026, 5, 22);

	const now = new SvelteDate();

	const days = Math.floor((now.getTime() - START_DATE.getTime()) / (24 * 60 * 60 * 1000));
</script>

<h1
	class="my-4 flex w-full -translate-x-2 flex-row items-center justify-center gap-4 text-center text-2xl md:text-5xl"
>
	<img
		src="zip.webp"
		alt="zip"
		class="h-10 md:h-20"
		style="animation: spin 2000s linear infinite"
	/>
	<span>zipdle</span>
</h1>
<button
	onclick={() => (manualTutorial = !manualTutorial)}
	class="absolute top-4 right-4 cursor-pointer px-2 text-2xl font-black text-shadow-lg text-shadow-slate-900 md:top-6 md:text-5xl"
	>?</button
>
<main
	class="to-md:px-2 relative grid w-full items-center justify-center gap-y-4 md:grid-cols-2 md:gap-x-20 md:gap-y-8"
>
	{#if !closedTutorial.current || manualTutorial}
		<Tutorial
			close={() => {
				closedTutorial.current = true;
				manualTutorial = false;
			}}
		/>
	{:else}
		<Game target={upcoming[days].target} targetPattern={upcoming[days].pattern} />
	{/if}
</main>

<style>
	@keyframes -global-spin {
		from {
			transform: rotate(0);
		}

		to {
			transform: rotate(360deg);
		}
	}
</style>
