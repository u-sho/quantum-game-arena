<script lang="ts">
	import type { TurnType } from './Game';

	/**
		Contains marks in selected square if collapse ongoing, else is `null`
	*/
	export let choices: TurnType[] | undefined;

	/**
		Passes selected choice of mark up to Game.handleCollapse
	*/
	export let onChoiceClick: Function;

	/**
		Conveys player information about the state of the game
	*/
	export let status: string;
</script>

{#if choices}
	{#each choices as choice (choice)}
		<div class="collapseChoice" onClick={() => onChoiceClick(choice)}>
			{choice}
		</div>
	{/each}
{:else}
	<div class="game-info">
		<div class="status">{status}</div>
	</div>
{/if}
