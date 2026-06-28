<script lang="ts">
	import Game from '../components/Game.svelte';
	import Tutorial from '../components/Tutorial.svelte';
	import { PersistedState } from 'runed';
	import { SvelteDate } from 'svelte/reactivity';

	let closedTutorial = new PersistedState('visited', false);

	let manualTutorial = $state(false);

	const now = new SvelteDate();
</script>

{#if !closedTutorial.current || manualTutorial}
	<Tutorial
		close={() => {
			closedTutorial.current = true;
			manualTutorial = false;
		}}
	/>
{/if}
<Game tutorialShown={!closedTutorial.current || manualTutorial} date={now.toDateString()} />

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
