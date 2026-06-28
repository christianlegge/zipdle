<script lang="ts">
	import Game from '../components/Game.svelte';
	import { SvelteDate } from 'svelte/reactivity';

	const now = new SvelteDate();
</script>

<Game date={now.toDateString()} />
