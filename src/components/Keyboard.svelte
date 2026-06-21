<script lang="ts">
	const buttons = [
		['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
		['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
		['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace']
	];

	let { processInput }: { processInput: (key: string) => void } = $props();
</script>

<section class="flex h-24 w-full flex-col items-center gap-1 md:col-span-2">
	{#each buttons as row, i (i)}
		<div class="flex h-full flex-row gap-1">
			{#each row as button (button)}
				<button
					class="w-8 cursor-pointer rounded bg-slate-300 p-2 text-slate-900"
					style:width={button.length > 1 ? '60px' : ''}
					onclick={() => processInput(button)}>{button === 'Backspace' ? '<<' : button}</button
				>
			{/each}
		</div>
	{/each}
</section>
