<script lang="ts">
	import { resolve } from '$app/paths';

	let { monthIndex, year }: { monthIndex: number; year: number } = $props();
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

	const startDay = $derived(new Date(year, monthIndex, 1).getDay());

	function hasPuzzle(day: number) {
		if (year < 2026) {
			return false;
		}
		if (year === 2026 && monthIndex < 5) {
			return false;
		}
		if (year === 2026 && monthIndex === 5 && day < 23) {
			return false;
		}
		if (new Date(year, monthIndex, day) > new Date()) {
			return false;
		}
		return true;
	}
</script>

<section class="flex flex-col items-center">
	<h2>{months[monthIndex]} {year}</h2>
	<div class="grid grid-cols-7 gap-1">
		{#each days as day (day)}
			<span class="text-center">{day}</span>
		{/each}
		{#each [...new Array(startDay).fill(null), ...new Array(30).fill(true)] as v, i (i)}
			{#if v && !hasPuzzle(i + 1 - startDay)}
				<div class="bg-slate-600 p-1 text-center">{v ? i + 1 - startDay : ''}</div>
			{:else}
				<a
					href={resolve(
						`/${year}-${(monthIndex + 1).toString().padStart(2, '0')}-${(i + 1 - startDay)
							.toString()
							.padStart(2, '0')}`
					)}
					class="{v ? 'bg-slate-400' : ''} p-1 text-center">{v ? i + 1 - startDay : ''}</a
				>
			{/if}
		{/each}
	</div>
</section>
