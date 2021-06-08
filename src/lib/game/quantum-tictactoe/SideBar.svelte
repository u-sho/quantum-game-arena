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
		{#each choices as choice (choice)}
			<div class="collapse-choice-btn" on:click|preventDefault={(_) => onChoiceClick(choice)}>
				<span>{choice[0]}<sub>{choice[1]}</sub></span>
			</div>
		{/each}
	{/if}
	{#if isGameOver}
		<div class="next-game-btn" on:click|preventDefault={onNextGameClick}>Next</div>
		<div class="reset-game-btn" on:click|preventDefault={onResetGameClick}>Reset</div>
	{/if}
	<div>
		<span class="xScore">X: {scores.X}</span>
		<span class="yScore">Y: {scores.Y}</span>
	</div>
</div>

<style lang="scss">
	.collapse-choice-btn {
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
	}

	.status {
		margin-bottom: 10px;
		width: 300px;
	}

	.next-game-btn,
	.reset-game-btn {
		width: 200px;
		height: 50px;
		font-family: inherit;
		font-size: 20px;
		border: 2px solid;
		text-align: center;
		cursor: pointer;
		margin: 5px;
	}
	.next-game-btn {
		background-color: var(--bg-color);
		border-color: var(--accent-color);
		color: var(--accent-color);
		&:hover {
			background-color: var(--accent-color);
			color: var(--bg-color);
		}
	}
	.reset-game-btn {
		background-color: var(--bg-color);
		border-color: var(--theme-color);
		color: var(--theme-color);
		&:hover {
			color: var(--bg-color);
			background-color: var(--theme-color);
		}
	}
</style>
