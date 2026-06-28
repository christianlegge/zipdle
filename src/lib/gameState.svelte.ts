export const gameState = $state({
	words: [] as string[],
	intermediate: '',
	flipping: false,
	endBoardShown: false
});

export function resetState() {
	gameState.words = [];
	gameState.intermediate = '';
	gameState.flipping = false;
	gameState.endBoardShown = false;
}
