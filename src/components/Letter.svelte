<script lang="ts">
	import { colors, type LetterColor } from '$lib/colorize';

	let { letter, color, glow }: { letter: string; color: LetterColor; glow: boolean } = $props();
	let scale = $state(1);
	let scaleX = $state(1);
	let flipped = $state(false);
	const duration = 300;

	export async function flip() {
		scale = 0;
		await new Promise((r) => setTimeout(r, duration / 2));
		flipped = true;
		if (glow) {
			scale = 1.5;
			scaleX = 1.5;
			setTimeout(() => {
				scale = 1;
				scaleX = 1;
			}, duration);
		} else {
			scale = 1;
		}
	}
</script>

<div
	class="my-auto flex h-12 w-12 items-center justify-center border-2 border-black text-center align-middle text-4xl uppercase transition {flipped &&
	glow
		? 'glow ' + color
		: ''}"
	style:color={flipped ? 'white' : 'black'}
	style:background-color={flipped ? colors[color] : colors.white}
	style:transition-duration={`${duration / 2}ms`}
	style:scale={`${scaleX} ${scale}`}
>
	{letter}
</div>

<style>
	.glow {
		position: relative;
		transform-style: preserve-3d;
	}

	.glow:before {
		content: '';
		box-shadow: 0px 0px 15px 4px var(--glow-color);
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		position: absolute;
		transform: translateZ(-90px);
		z-index: -999;
	}

	.glow.black:before {
		--glow-color: #bbbbbb;
	}

	.glow.yellow:before {
		--glow-color: #ffff00;
	}

	.glow.green:before {
		--glow-color: #00ff00;
	}
</style>
