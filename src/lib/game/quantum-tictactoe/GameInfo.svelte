<script lang="ts">
	import type { TurnType } from './Game';

	// Contains marks in selected square if collapse ongoing
	export let choices: TurnType[] | undefined;

	// Passes selected choice of mark up to Game.handleCollapse
	export let onChoiceClick: (choice: TurnType) => void;

	// Conveys player information about the state of the game
	export let status: string;

	export let isGameOver: boolean;
	export let scores: { X: number; Y: number };

	// Go to next game with scores
	export let onNextGameClick: () => void;

	// Reset scores & Go to new game
	export let onResetGameClick: () => void;
</script>

<div class="game-info">
	<p class="status">{status}</p>
	{#if choices}
		<div class="btn-list">
			{#each choices as choice (choice)}
				<div class="btn collapse-choice" on:click|preventDefault={(_) => onChoiceClick(choice)}>
					<span>{choice[0]}<sub>{choice[1]}</sub></span>
				</div>
			{/each}
		</div>
	{/if}
	{#if isGameOver}
		<div class="btn-list">
			<div class="btn next-game" on:click|preventDefault={onNextGameClick}>
				<span class="btn-text">Next</span>
			</div>
			<div class="btn reset-game" on:click|preventDefault={onResetGameClick}>
				<span class="btn-text">Reset</span>
			</div>
		</div>
	{/if}
	<div>
		<span class="x-score">X: {scores.X}</span>
		<span class="y-score">Y: {scores.Y}</span>
	</div>
</div>

<style lang="scss">
	.collapse-choice {
		width: 50px;
		height: 50px;
		font-size: 24px;
		font-family: inherit;
		border: 2px solid var(--accent-color);
		color: var(--accent-color);
		text-align: center;
		cursor: pointer;
		margin: 5px;
		background-color: var(--bg-color);
		user-select: none;

		&:hover {
			background-color: var(--accent-color);
			color: var(--bg-color);
		}

		sub {
			font-size: 16px;
		}
	}

	.game-info {
		margin-left: 20px;
		top: 0px;
		width: 480px;
	}

	.btn-list {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.btn {
		box-sizing: border-box;
		margin: 5px;
		padding: 0;
		width: 160px;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2px solid;
		text-align: center;
		cursor: pointer;

		.btn-text {
			font-size: 24px;
			line-height: 50px;
		}
	}

	.next-game {
		background-color: var(--bg-color);
		border-color: var(--accent-color);
		color: var(--accent-color);
		font-weight: bold;
		&:hover {
			background-color: var(--accent-color);
			color: var(--bg-color);
		}
	}

	.reset-game {
		background-color: var(--bg-color);
		border-color: var(--theme-color);
		color: var(--theme-color);
		&:hover {
			color: var(--bg-color);
			background-color: var(--theme-color);
		}
	}
</style>
