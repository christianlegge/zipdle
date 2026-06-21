<script lang="ts">
	import Game from '../components/Game.svelte';
	import targetList from '$lib/targetList';

	let target = targetList[Math.floor(Math.random() * targetList.length)];
</script>

<h1 class="my-8 w-full text-center text-5xl">zipdle</h1>
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
