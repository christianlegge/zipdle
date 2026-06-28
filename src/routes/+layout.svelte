<script lang="ts">
	import './layout.css';
	import { resolve } from '$app/paths';
	import { fade } from 'svelte/transition';
	import Tutorial from '../components/Tutorial.svelte';
	import { PersistedState } from 'runed';

	let { children } = $props();
	let closedTutorial = new PersistedState('visited', false);
	let tutorial = $state(!closedTutorial.current);

	function closeTutorial() {
		closedTutorial.current = true;
		tutorial = false;
	}
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<link rel="shortcut icon" href="/favicon.ico" />
	<meta name="apple-mobile-web-app-title" content="zipdle" />
	<link rel="manifest" href="/site.webmanifest" />
	<title>zipdle</title>
</svelte:head>
<h1
	class="relative my-4 flex w-full -translate-x-2 flex-row items-center justify-center gap-4 text-center text-2xl md:text-5xl"
>
	<img
		src="zip.webp"
		alt="zip"
		class="h-10 md:h-20"
		style="animation: spin 2000s linear infinite"
	/>
	<a href={resolve('/')} class="relative flex flex-row items-center"
		>zipdle
		<span
			class="absolute -right-14 rounded bg-slate-900 p-1 text-xs font-medium tracking-wider uppercase"
			style="font-family:Manrope Variable">Beta</span
		>
	</a>
</h1>
<button
	onclick={() => {
		if (tutorial) {
			closeTutorial();
		} else {
			tutorial = true;
		}
	}}
	class="absolute top-4 right-4 cursor-pointer px-2 text-2xl font-black text-shadow-lg text-shadow-slate-900 md:top-6 md:text-5xl"
	>?</button
>
<main
	transition:fade
	class="to-md:px-2 relative grid w-full items-center justify-center gap-y-4 md:grid-cols-2 md:gap-x-20 md:gap-y-8"
>
	{#if tutorial}
		<Tutorial close={closeTutorial} />
	{:else}
		{@render children()}
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
