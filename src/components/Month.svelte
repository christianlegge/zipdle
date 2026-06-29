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

	const persistedState = JSON.parse(localStorage.getItem('gameState') ?? {});

	function isToday(day: number) {
		const now = new Date();
		return now.getDate() === day && now.getFullYear() === year && now.getMonth() === monthIndex;
	}

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

	function dateString(day: number) {
		return `${year}-${(monthIndex + 1).toString().padStart(2, '0')}-${day
			.toString()
			.padStart(2, '0')}`;
	}

	function getBgClass(date: string) {
		console.log(date, persistedState[date]);
		if (!persistedState[date] || persistedState[date].words.length === 0) {
			return 'bg-slate-500';
		}
		if (persistedState[date].words.length < 6) {
			return 'bg-yellow-600';
		}
		if (persistedState[date].score < 1) {
			return 'bg-orange-600';
		}
		return 'bg-green-600';
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
				<div class="bg-slate-700 p-1 text-center text-slate-500">{v ? i + 1 - startDay : ''}</div>
			{:else}
				<a
					href={resolve(isToday(i + 1 - startDay) ? '/' : `/${dateString(i + 1 - startDay)}`)}
					class="{v ? getBgClass(dateString(i + 1 - startDay)) : ''} p-1 text-center"
					>{v ? i + 1 - startDay : ''}</a
				>
			{/if}
		{/each}
	</div>
</section>
