<script lang="ts">
	import Game from '../../components/Game.svelte';

	let { data } = $props();

	const date = $derived(data.date);
</script>

<Game {date} />
