<script lang="ts">
	import GameBoard from './GameBoard.svelte';
	import GameInfo from './GameInfo.svelte';
	import type { TurnType, SquareNumType } from './Game';
	import Game from './Game';

	let game = new Game();
	game.setStatus("Player X's turn!");
	let gameCount = 1;

	let state = game.state;

	$: status = state.status as string;

	$: choices =
		state.collapseSquare !== null
			? state.qSquares[state.collapseSquare]?.filter((choice) => state.cycleMarks?.includes(choice))
			: undefined;

	function handleSquareClick(i: SquareNumType) {
		console.table(game.state);
		const statuses = game.handleSquareClick(i);
		const status = statuses[game.whoseTurn()] as string;

		game.setStatus(status);
		state = { ...game.state };
	}

	function handleCollapse(mark: TurnType) {
		const statuses = game.handleCollapse(mark);
		const status = statuses[game.whoseTurn()];

		game.setStatus(status);
		state = { ...game.state };
	}

	function handleNextGameClick() {
		game = new Game();
		game.setState({ xScore: state.xScore, yScore: state.yScore });
		game.setStatus("Player X's turn!");
		gameCount += 1;

		state = { ...game.state };
	}

	function handleResetGameClick() {
		game = new Game();
		game.setStatus("Player X's turn!");
		gameCount = 1;

		state = { ...game.state };
	}
</script>

<div class="game">
	<div class="game-board">
		<GameBoard
			cSquares={state.cSquares}
			qSquares={state.qSquares}
			cycleSquares={state.cycleSquares}
			cycleMarks={state.cycleMarks}
			collapseSquare={state.collapseSquare}
			onSquareClick={handleSquareClick}
		/>
	</div>
	<GameInfo
		{status}
		{choices}
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

	.game-board {
		width: 500px;
	}
</style>
