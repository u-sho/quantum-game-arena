<script lang="ts">
	import BoardSquare from './BoardSquare.svelte';
	import type { SquareNumType, StateType } from '$lib/quantum-tictactoe/Game';

	export let cSquares: StateType['cSquares'];
	export let qSquares: StateType['qSquares'];
	export let cycleSquares: StateType['cycleSquares'];
	export let cycleMarks: StateType['cycleMarks'];
	export let collapseSquare: StateType['collapseSquare'];

	// Passes index of square that was clicked up to Game.handleSquareClick.
	export let onSquareClick: (i: SquareNumType) => void;

	const rows = [0, 1, 2] as const;
	const columns = [0, 1, 2] as const;

	$: onClick = (row: 0 | 1 | 2, column: 0 | 1 | 2) =>
		onSquareClick((row * 3 + column) as SquareNumType);
</script>

<div>
	{#each rows as row}
		<div class="board-row">
			{#each columns as column}
				<BoardSquare
					cMark={cSquares[row * 3 + column]}
					qMarks={qSquares[row * 3 + column]}
					{cycleMarks}
					isHighlighted={!!cycleSquares?.includes(row * 3 + column)}
					isBeingCollapsed={collapseSquare === row * 3 + column}
					onClick={() => onClick(row, column)}
				/>
			{/each}
		</div>
	{/each}
</div>

<style lang="scss">
	.board-row:after {
		clear: both;
		content: '';
		display: table;
	}
</style>
