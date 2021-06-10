<script lang="ts">
	import type { MaxLengthArray } from '$lib/types/generics';

	import GameBoard from './GameBoard.svelte';
	import GameInfo from './GameInfo.svelte';
	import type { TurnType, SquareNumType } from './QuantumTTT';
	import Game from './QuantumTTT';

	let game = new Game();
	game.setStatus("Player X's turn!");
	let gameCount = 1;

	let state = game.state;
	let message = state.status;

	$: choices =
		state.collapseSquare !== null
			? (state.qSquares[state.collapseSquare]?.filter((choice) =>
					state.cycleMarks?.includes(choice)
			  ) as MaxLengthArray<TurnType, 3> | undefined)
			: undefined;

	function handleSquareClick(i: SquareNumType) {
		const status = game.handleSquareClick(i);
		console.table(game.state);

		state = { ...game.state };
		message = status;
	}

	function handleCollapse(mark: TurnType) {
		const status = game.handleCollapse(mark);

		state = { ...game.state };
		message = status;
	}

	function handleNextGameClick() {
		game = new Game();
		game.setState({ xScore: state.xScore, yScore: state.yScore });
		game.setStatus("Player X's turn!");
		gameCount += 1;

		state = { ...game.state };
		message = game.state.status;
	}

	function handleResetGameClick() {
		game = new Game();
		game.setStatus("Player X's turn!");
		gameCount = 1;

		state = { ...game.state };
		status = game.state.status;
	}
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
		isGameOver={state.isGameOver}
		scores={{ X: state.xScore, Y: state.yScore }}
		onChoiceClick={handleCollapse}
		onNextGameClick={handleNextGameClick}
		onResetGameClick={handleResetGameClick}
	/>
</div>

<style lang="scss">
	.game {
		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;
		margin-top: 50px;
	}
</style>
