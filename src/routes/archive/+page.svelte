<script lang="ts">
	import Month from '../../components/Month.svelte';

	const START_DATE = new Date(2026, 5, 23);

	const today = new Date();

	const allMonths: { year: number; month: number }[] = [];

	let month = START_DATE.getMonth();
	let year = START_DATE.getFullYear();
	while (year !== today.getFullYear() || month !== today.getMonth()) {
		allMonths.push({ year, month });
		month++;
		if (month >= 12) {
			month = 0;
			year++;
		}
	}
	allMonths.push({ year, month });
	const legend = [
		['bg-slate-500', 'Not started'],
		['bg-yellow-600', 'Started, not completed'],
		['bg-orange-600', 'Imperfect score'],
		['bg-green-600', 'Perfect score'],
		['bg-slate-700', 'No puzzle for date']
	];
</script>

<section class="col-span-2 text-center">
	<span class="text-xs uppercase">Legend</span>
	<div class="mx-auto mt-1 flex w-fit flex-row flex-wrap justify-center gap-2 font-semibold">
		{#each legend as [bg, text], i (bg)}
			<span class="rounded p-1 text-sm {bg} {i === 4 ? 'text-slate-500' : ''}">{text}</span>
		{/each}
	</div>
</section>
<div
	class="col-span-2 mx-auto flex max-w-300 flex-row flex-wrap items-start justify-center gap-10 px-4"
>
	{#each allMonths as { year, month } (`${year}${month}`)}
		<Month monthIndex={month} {year} />
	{/each}
</div>
