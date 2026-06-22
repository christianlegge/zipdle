<script lang="ts">
	import Game from '../components/Game.svelte';
	import targetList from '$lib/targetList';

	let target = targetList[Math.floor(Math.random() * targetList.length)];
</script>

<h1 class="my-4 flex w-full flex-row items-center justify-center gap-4 text-center text-5xl">
	<img
		src="zip.webp"
		alt="zip"
		height="80"
		width="80"
		style="animation: spin 2000s linear infinite"
	/>
	<span>zipdle</span>
</h1>
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
