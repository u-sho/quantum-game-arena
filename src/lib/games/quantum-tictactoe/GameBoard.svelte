<!--
	QuantumTicTacToe is made by Rohan Pandit in 2017 and changed by Shouhei Uechi in 2021.
		Copyright (C) 2021  Shouhei Uechi
		Copyright (C) 2017  Rohan Pandit, available at <https://github.com/rohanp/QuantumTicTacToe/tree/master/>

	This file is part of QuantumTicTacToe.

	QuantumTicTacToe is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	QuantumTicTacToe is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with QuantumTicTacToe.  If not, see <https://www.gnu.org/licenses/>.
-->
<script lang="ts">
import BoardSquare from './GameBoardSquare/index.svelte';
import type { SquareType, StateType } from './QuantumTTT.type';

export let cSquares: StateType['cSquares'];
export let qSquares: StateType['qSquares'];
export let cycleSquares: StateType['cycleSquares'];
export let cycleMarks: StateType['cycleMarks'];
export let collapseSquare: StateType['collapseSquare'];

// Passes index of square that was clicked up to Game.handleSquareClick.
export let onSquareClick: (i: SquareType) => void;

const rows = [0, 1, 2] as const;
const columns = [0, 1, 2] as const;

$: onClick = (row: 0 | 1 | 2, column: 0 | 1 | 2) => onSquareClick((row * 3 + column) as SquareType);
$: isHighlighted = (row: 0 | 1 | 2, column: 0 | 1 | 2) =>
	!!cycleSquares?.length && cycleSquares.includes((row * 3 + column) as SquareType);
</script>

<div class="game-board">
	{#each rows as row}
		<div class="game-board--row">
			{#each columns as column}
				<BoardSquare
					cMark={cSquares[row * 3 + column]}
					qMarks={qSquares[row * 3 + column]}
					{cycleMarks}
					isHighlighted={isHighlighted(row, column)}
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
