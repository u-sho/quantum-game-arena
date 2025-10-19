<!-- @migration-task Error while migrating Svelte code: can't migrate `let state = game.state;` to `$state` because there's a variable named state.
     Rename the variable and try again or migrate by hand. -->
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
import type { MaxLengthArray } from '$lib/types/generics';
import { getRandomInt } from '$lib/utils/getRandomInt';
import { getOrdinal } from '$lib/utils/getNumeral';
import { sleep } from '$lib/utils/sleep';

import GameBoard from './GameBoard.svelte';
import GameInfo from './GameInfo.svelte';
import GameFooter from './GameFooter.svelte';
import type { MarkType, SquareType, StateType } from './QuantumTTT.type';
import Game from './QuantumTTT';

let game = new Game();
let gameCount = 1;

let state = game.state;
let message = state.status;

$: choices =
	state.collapseSquare !== null && state.cycleMarks !== null
		? ((
				state.qSquares[state.collapseSquare] as Exclude<StateType['qSquares'][SquareType], []>
			).filter((choice) =>
				(state.cycleMarks as Exclude<StateType['cycleMarks'], null | []>).includes(choice)
			) as MaxLengthArray<MarkType, 3> | undefined)
		: undefined;

const handleSquareClick = (i: SquareType): void => {
	if (game.state.isOver) return;
	const isPlayerMove = game.whoseTurn() === 'X' && !state.cycleSquares;
	const isPlayerResolvableCollapse =
		game.whoseTurn() === 'Y' && state.cycleSquares && state.cycleSquares.length > 0;
	if (isPlayerMove || isPlayerResolvableCollapse) {
		const status = game.handleSquareClick(i);

		if (import.meta.env.DEV) console.table(game.state);
		state = { ...game.state };
		message = status;
	} else {
		message = 'AI is thinking!';
		return;
	}

	const isAIResolvableCollapse =
		game.whoseTurn() === 'X' && state.cycleSquares && state.cycleSquares.length > 0;
	if (isAIResolvableCollapse) {
		message = 'AI is thinking...';
		sleep(1200)
			.then(async () => {
				await aiHandleCollapse();
				await sleep(700);

				if (game.state.isOver) {
					message = game.state.status;
					return;
				}

				message = 'AI is thinking...';
				await sleep(1200);
				aiMove();
				return;
			})
			.catch((err) => {
				console.error(err);
			});
		return;
	}

	const isAIMove = game.whoseTurn() === 'Y' && !state.cycleSquares;
	if (isAIMove) {
		message = 'AI is thinking...';
		sleep(1200)
			.then(() => {
				aiMove();
			})
			.catch((err) => {
				console.error(err);
			});
	}
	return;
};

const aiMove = (): void => {
	let cSquares: MaxLengthArray<SquareType, 9> = [];
	for (let i = 0; i < 9; i++) {
		if (state.cSquares[i as SquareType] !== null) cSquares = [...cSquares, i as SquareType];
	}
	const aiMove1 = getRandomInt({ min: 0, max: 8, excepts: cSquares }) as SquareType;
	const aiMove2 = getRandomInt({ min: 0, max: 8, excepts: [...cSquares, aiMove1] }) as SquareType;
	game.handleSquareClick(aiMove1);

	const status = game.handleSquareClick(aiMove2);
	state = { ...game.state };
	message = status;
	return;
};

const aiHandleCollapse = async (): Promise<void> => {
	if (state.cycleSquares != null) {
		const randomInt = getRandomInt({ min: 0, max: state.cycleSquares.length - 1 });
		const aiChoiceSquare = state.cycleSquares[randomInt];
		game.handleSquareClick(aiChoiceSquare);
		state = { ...game.state };
	}

	message = 'AI is thinking...';
	await sleep(1200);
	if (choices === undefined) return;
	const aiChoiceMark = choices[getRandomInt({ min: 0, max: choices.length - 1 })];
	game.handleCollapse(aiChoiceMark);
	state = { ...game.state };

	message = 'AI resolved collapse!';
	return;
};

const handleCollapse = (mark: MarkType): void => {
	const isPlayerResolvableCollapse = game.whoseTurn() === 'Y';
	if (!isPlayerResolvableCollapse) return;

	const status = game.handleCollapse(mark);

	state = { ...game.state };
	message = status;
	return;
};

const handleNextGameClick = (): void => {
	game = new Game();
	game.setState({ scores: { ...state.scores } });
	gameCount += 1;

	state = { ...game.state };
	message = `The ${getOrdinal(gameCount)} game!\n${game.state.status}`;
	return;
};

const handleResetGameClick = (): void => {
	game = new Game();
	gameCount = 1;

	state = { ...game.state };
	message = game.state.status;
	return;
};
</script>

<div class="game">
	<GameBoard
		cSquares={state.cSquares}
		qSquares={state.qSquares}
		cycleSquares={state.cycleSquares}
		cycleMarks={state.cycleMarks}
		collapseSquare={state.collapseSquare}
		onSquareClick={handleSquareClick}
	/>
	<GameInfo
		{choices}
		status={message}
		isGameOver={state.isOver}
		scores={state.scores}
		onChoiceClick={handleCollapse}
		onNextGameClick={handleNextGameClick}
		onResetGameClick={handleResetGameClick}
	/>
</div>
<GameFooter />

<style>
.game {
	display: flex;
	flex-direction: row;
	justify-content: center;
	flex-wrap: wrap;
	margin-top: 50px;
}
</style>
