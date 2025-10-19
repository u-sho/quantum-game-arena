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
import GameBoardSquare from './GameBoardSquare.svelte';
import type { SquareType, StateType } from './QuantumTTT.type';

type Props = {
	cSquares: StateType['cSquares'];
	qSquares: StateType['qSquares'];
	cycleSquares: StateType['cycleSquares'];
	cycleMarks: StateType['cycleMarks'];
	collapseSquare: StateType['collapseSquare'];
	// Passes index of square that was clicked up to Game.handleSquareClick.
	onSquareClick: (i: SquareType) => void;
};

const { cSquares, qSquares, cycleSquares, cycleMarks, collapseSquare, onSquareClick }: Props =
	$props();

const rows = [0, 1, 2] as const;
const columns = [0, 1, 2] as const;

const onClick = (row: 0 | 1 | 2, column: 0 | 1 | 2) => (): void => {
	onSquareClick((row * 3 + column) as SquareType);
};

const isHighlighted = $derived(
	(row: 0 | 1 | 2, column: 0 | 1 | 2): boolean =>
		!!cycleSquares?.length && cycleSquares.includes((row * 3 + column) as SquareType)
);

const currentSquareName = (
	row: 0 | 1 | 2,
	column: 0 | 1 | 2
): `${'upper' | 'middle' | 'lower'} ${'left' | 'center' | 'right'} square` => {
	const verticalPosition = row === 0 ? 'upper' : row === 1 ? 'middle' : 'lower';
	const horizontalPosition = column === 0 ? 'left' : column === 1 ? 'center' : 'right';
	return `${verticalPosition} ${horizontalPosition} square`;
};
</script>

<div class="game-board">
	{#each rows as row (row)}
		<div class="game-board--row">
			{#each columns as column (column)}
				{@const squareIndex = (row * 3 + column) as SquareType}
				<GameBoardSquare
					cMark={cSquares[squareIndex]}
					qMarks={qSquares[squareIndex]}
					{cycleMarks}
					isHighlighted={isHighlighted(row, column)}
					isBeingCollapsed={collapseSquare === squareIndex}
					onClick={onClick(row, column)}
					squareName={currentSquareName(row, column)}
				/>
			{/each}
		</div>
	{/each}
</div>

<style>
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
