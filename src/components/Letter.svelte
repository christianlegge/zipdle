<script lang="ts">
	import { colors, type LetterColor } from '$lib/colorize';

	let { letter, color }: { letter: string; color: LetterColor } = $props();
	let scale = $state(1);
	let flipped = $state(false);
	const duration = 300;

	export async function flip() {
		scale = 0;
		await new Promise((r) => setTimeout(r, duration / 2));
		flipped = true;
		scale = 1;
	}
</script>

<div
	class="my-auto flex h-12 w-12 items-center justify-center border-2 border-black text-center align-middle text-4xl uppercase transition"
	style:color={flipped ? 'white' : 'black'}
	style:background-color={flipped ? colors[color] : colors.white}
	style:transition-duration={`${duration / 2}ms`}
	style:scale={`1 ${scale}`}
>
	{letter}
</div>
