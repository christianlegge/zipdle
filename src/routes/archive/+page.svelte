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
</script>

<div
	class="col-span-2 mx-auto flex max-w-300 flex-row flex-wrap items-start justify-center gap-10 px-4"
>
	{#each allMonths as { year, month } (`${year}${month}`)}
		<Month monthIndex={month} {year} />
	{/each}
</div>
