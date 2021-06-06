<script lang="ts">
	import GameBoard from '$lib/quantum-tictactoe/GameBoard/index.svelte';
	import SideBar from '$lib/quantum-tictactoe/SideBar.svelte';
	import type { TurnType, SquareNumType } from '$lib/quantum-tictactoe/Game';
	import Game from '$lib/quantum-tictactoe/Game';

	const game = new Game();
	game.setStatus("Player X's turn!");

	$: status = game.state.status as string;

	$: choices = game.state.collapseSquare
		? game.state.qSquares[game.state.collapseSquare]?.filter((choice) =>
				game.state.cycleMarks?.includes(choice)
		  )
		: undefined;

	function handleSquareClick(i: SquareNumType) {
		const statuses = game.handleSquareClick(i);
		const status = statuses[game.whoseTurn()] as string;

		game.setStatus(status);
	}

	function handleCollapse(mark: TurnType) {
		const statuses = game.handleCollapse(mark);
		const status = statuses[game.whoseTurn()];

		game.setStatus(status);
	}
</script>

<div>
	<h1 class="title">Quantum Tic-Tac-Toe</h1>
	<div class="game">
		<div class="game-board">
			<GameBoard
				cSquares={game.state.cSquares}
				qSquares={game.state.qSquares}
				cycleSquares={game.state.cycleSquares}
				cycleMarks={game.state.cycleMarks}
				collapseSquare={game.state.collapseSquare}
				onSquareClick={handleSquareClick}
			/>
			<div class="xScore">X: {game.state.xScore}</div>
			<div class="yScore">Y: {game.state.yScore}</div>
		</div>
		<SideBar {status} {choices} onChoiceClick={handleCollapse} />
	</div>
</div>

<style lang="scss">
	.title {
		text-align: center;
	}

	.game {
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-top: 50px;
	}

	.game-board {
		width: 500px;
	}

	.xScore {
		margin-top: 10px;
		font-size: 20px;
		float: left;
	}
	.yScore {
		margin-top: 10px;
		font-size: 20px;
		float: right;
	}
</style>
