<script lang="ts">
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<link rel="shortcut icon" href="/favicon.ico" />
	<meta name="apple-mobile-web-app-title" content="zipdle" />
	<link rel="manifest" href="/site.webmanifest" />
	<title>zipdle</title>
</svelte:head>
{@render children()}
