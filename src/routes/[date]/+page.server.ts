import { error } from '@sveltejs/kit';
export function load({ params }) {
	if (!/^\d{4}-[01]\d-[0123]\d$/.test(params.date)) {
		error(404, 'Not found');
	}
	const now = new Date();
	const date = new Date(params.date + ' 00:00');
	const start = new Date('2026-06-23 00:00');
	if (date > now || date < start) {
		error(404, 'Not found');
	}
	return { date: params.date };
}
