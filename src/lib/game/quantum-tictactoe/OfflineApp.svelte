<script lang="ts">
	import GameBoard from '$lib/game/quantum-tictactoe/GameBoard/index.svelte';
	import SideBar from '$lib/game/quantum-tictactoe/SideBar.svelte';
	import type { TurnType, SquareNumType } from './Game';
	import Game from './Game';

	const game = new Game();
	game.setStatus("Player X's turn!");

	let state = game.state;

	$: status = state.status as string;

	$: choices =
		state.collapseSquare !== null
			? state.qSquares[state.collapseSquare]?.filter((choice) => state.cycleMarks?.includes(choice))
			: undefined;

	function handleSquareClick(i: SquareNumType) {
		console.table(game);
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
	<SideBar
		{status}
		{choices}
		scores={{ X: state.xScore, Y: state.yScore }}
		onChoiceClick={handleCollapse}
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
