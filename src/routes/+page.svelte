<script lang="ts">
	import Game from '../components/Game.svelte';
	import { SvelteDate } from 'svelte/reactivity';

	const now = new SvelteDate();
</script>

<Game
	date="{now.getFullYear()}-{(now.getMonth() + 1).toString().padStart(2, '0')}-{now
		.getDate()
		.toString()
		.padStart(2, '0')}"
/>
