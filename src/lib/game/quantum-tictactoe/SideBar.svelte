<script lang="ts">
	import type { TurnType } from './Game';

	// Contains marks in selected square if collapse ongoing
	export let choices: TurnType[] | undefined;

	// Passes selected choice of mark up to Game.handleCollapse
	export let onChoiceClick: Function;

	// Conveys player information about the state of the game
	export let status: string;
</script>

<div class="game-info">
	<div class="status">{status}</div>
	{#if choices}
		{#each choices as choice (choice)}
			<div class="collapseChoice" on:click|preventDefault={(_) => onChoiceClick(choice)}>
				{choice}
			</div>
		{/each}
	{/if}
</div>

<style lang="scss">
	.collapseChoice {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 50px;
		height: 50px;
		border: 2px;
		border-color: var(--accent-color);
		text-align: center;
		cursor: default;
		border-style: solid;
		margin: 5px;
		user-select: none;

		&:hover {
			background-color: var(--accent-color);
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
