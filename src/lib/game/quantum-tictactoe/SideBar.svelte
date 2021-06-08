<script lang="ts">
	import type { TurnType } from './Game';

	// Contains marks in selected square if collapse ongoing
	export let choices: TurnType[] | undefined;

	// Passes selected choice of mark up to Game.handleCollapse
	export let onChoiceClick: (choice: TurnType) => void;

	// Conveys player information about the state of the game
	export let status: string;

	export let scores: { X: number; Y: number };
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
</style>
