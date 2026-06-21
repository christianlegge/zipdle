<script lang="ts">
	import { colors, type LetterColor } from '$lib/colorize';

	let { pattern }: { pattern: LetterColor[][] } = $props();
</script>

<div class="flex flex-col">
	{#each pattern as row, i (i)}
		<div class="flex flex-row">
			{#each row as square, i (i)}
				<div class="h-4 w-4 border border-slate-700" style:background-color={colors[square]}></div>
			{/each}
		</div>
	{/each}
</div>
