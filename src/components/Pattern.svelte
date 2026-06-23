<script lang="ts">
	import { colors, type LetterColor } from '$lib/colorize';

	let { pattern, target }: { pattern: LetterColor[][]; target?: LetterColor[][] } = $props();
</script>

<div class="flex flex-col">
	{#each pattern as row, i (i)}
		<div class="flex flex-row">
			{#each row as square, j (j)}
				<div class="h-4 w-4 border border-slate-700" style:background-color={colors[square]}>
					{#if target && target[i][j] === square}
						<svg viewBox="0 0 10 10">
							<path d="M 2 5 L 5 8 L 8 2" stroke="white" stroke-width="1" fill="transparent" />
						</svg>
					{:else if target && target[i][j] !== 'black' && square !== 'black'}
						<svg viewBox="0 0 10 10">
							<path
								d="M 1 5 C 2 3 5 3 5 5 S 8 8 9 5"
								fill="transparent"
								stroke="white"
								stroke-width="1"
							/>
						</svg>
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>
