<script lang="ts">
	import Game from '../components/Game.svelte';
	import targetList from '$lib/targetList';
	import Tutorial from '../components/Tutorial.svelte';
	import { PersistedState } from 'runed';

	let target = targetList[Math.floor(Math.random() * targetList.length)];

	let closedTutorial = new PersistedState('visited', false);

	let manualTutorial = $state(false);
</script>

<h1
	class="my-4 flex w-full -translate-x-2 flex-row items-center justify-center gap-4 text-center text-5xl"
>
	<img
		src="zip.webp"
		alt="zip"
		height="80"
		width="80"
		style="animation: spin 2000s linear infinite"
	/>
	<span>zipdle</span>
</h1>
<button
	onclick={() => (manualTutorial = !manualTutorial)}
	class="absolute top-6 right-4 cursor-pointer px-2 text-5xl font-black text-shadow-lg text-shadow-slate-900"
	>?</button
>
<main
	class="to-md:px-2 relative grid w-full items-center justify-center gap-x-20 gap-y-8 md:grid-cols-2"
>
	{#if !closedTutorial.current || manualTutorial}
		<Tutorial
			close={() => {
				closedTutorial.current = true;
				manualTutorial = false;
			}}
		/>
	{:else}
		<Game
			{target}
			targetPattern={[
				['green', 'green', 'green', 'black', 'black'],
				['black', 'black', 'yellow', 'yellow', 'yellow'],
				['green', 'green', 'green', 'black', 'black'],
				['black', 'black', 'yellow', 'yellow', 'yellow'],
				['green', 'green', 'green', 'black', 'black'],
				['black', 'black', 'yellow', 'yellow', 'yellow']
			]}
		/>
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
