<script lang="ts">
	let { close }: { close: () => void } = $props();
	import { fade } from 'svelte/transition';
	import Word from './Word.svelte';
</script>

<section
	transition:fade
	class="absolute inset-2 mx-auto h-fit overflow-hidden max-md:max-h-[80dvh] md:inset-0 md:col-span-2 md:w-[65ch]"
>
	<div class="space-y-4 overflow-auto rounded bg-slate-500 p-4 max-md:max-h-[80dvh]">
		<h2>What is zipdle?</h2>
		<p>You know Wordle? It's kind of like the opposite of that.</p>
		<p>
			Instead of trying to guess the word based on clues, you already know the word. Manipulating
			the clues with your guesses is the object of the game.
		</p>
		<h2>How?</h2>
		<p>
			You'll see a target word and a pattern next to the board. Your goal is to draw the pattern as
			close as you can. There is always at least one perfect solution with relatively common words.
		</p>
		<p>
			Green squares mean you put the right letter in the right place. Yellow means the letter is in
			the word, but in the wrong spot.
		</p>
		<p>
			Careful with yellow squares — you only get as many yellow squares as there are copies of that
			letter in the word. If the target word is "OVERT":
		</p>
		<div class="flex flex-col items-center gap-2">
			<span class="w-40 -translate-x-10 text-left text-sm"
				>The first O is yellow because there is an O in the target word.</span
			>
			<Word word="roomy" target="overt" targetPattern={[]} preflip />
			<span class="mb-6 w-44 -translate-x-6 text-right text-sm"
				>But there's only one, and it's already accounted for — so the second one is grey.</span
			>
			<Word word="tenet" target="overt" targetPattern={[]} preflip />
			<span class="max-w-80 text-left text-sm"
				>This T is grey, even though it appears first and there's a T in the target word. But that T
				was guessed in the right place, and the green square takes priority.</span
			>
		</div>
		<h2>What else?</h2>
		<p>
			Unlike Wordle, you can't use the same word twice. It's a stupid move there, but they do let
			you do it. Here, it would be a pretty huge advantage in cases where the pattern repeats rows.
			So you can't. Sorry.
		</p>
		<p>
			Scoring is based on similarity to the target pattern. Matching the color is best, but putting
			a green for a yellow or vice versa is half as good. Maximum score is 100%, obviously.
		</p>
		<h2>Who made this?</h2>
		<p>
			<a
				href="https://christianlegge.dev"
				class="cursor-pointer font-semibold text-fuchsia-100 underline"
				>You can find me here if you want.</a
			> The idea was inspired by my friend who was weirdly good at doing this.
		</p>
		<p>
			<a
				href="https://github.com/christianlegge/zipdle"
				class="cursor-pointer font-semibold text-fuchsia-100 underline"
				>The source code for this project can be found here.</a
			>
		</p>
		<h2>Was this vibe coded?</h2>
		<p>No.</p>
		<button class="mx-auto block cursor-pointer rounded bg-slate-300 p-2 text-black" onclick={close}
			>Let's do it</button
		>
	</div>
	<div class="h-24"></div>
</section>

<style lang="postcss">
	@reference "tailwindcss";

	h2 {
		@apply w-full text-center text-lg tracking-wide uppercase;
	}
</style>
