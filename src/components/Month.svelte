<script lang="ts">
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
</script>

<section>
	<h2>{months[monthIndex]} {year}</h2>
	<div class="grid grid-cols-7">
		{#each days as day (day)}
			<span>{day}</span>
		{/each}
		{#each [...new Array(startDay).fill(null), ...new Array(30).fill(true)] as v, i (i)}
			<div>{v ? i + 1 - startDay : ''}</div>
		{/each}
	</div>
</section>
