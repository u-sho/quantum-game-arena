<script lang="ts">
	import BoardSquare from './GameBoardSquare/index.svelte';
	import type { SquareNumType, StateType } from './QuantumTTT';

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

<div class="game-board">
	{#each rows as row}
		<div class="game-board--row">
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
	.game-board {
		border: 2px solid var(--theme-color);
		display: flex;
		flex-wrap: nowrap;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.game-board--row {
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
</style>
