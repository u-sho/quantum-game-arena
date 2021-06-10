<script lang="ts">
	import type { MarkType, StateType } from '$lib/games/quantum-tictactoe/QuantumTTT.type';

	export let qMarks: StateType['qSquares'][0];
	export let cycleMarks: StateType['cycleMarks'];
	export let isHighlighted: boolean;
	export let isBeingCollapsed: boolean;

	function getTextColor(mark: MarkType) {
		if (cycleMarks?.includes(mark)) {
			if (isBeingCollapsed) return 'red';
			if (isHighlighted) return 'blue';
		}
		return 'white';
	}
</script>

<div class="quantum-marks">
	{#each qMarks as m (m)}
		<span class={getTextColor(m)}>{m[0]}<sub>{m[1]}</sub></span>
	{/each}
</div>

<style lang="scss">
	.quantum-marks {
		box-sizing: border-box;
		margin: 0;
		padding: 8px;
		width: 100%;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-items: flex-start;
		cursor: pointer;
		user-select: none;
		-moz-user-select: none;
		-webkit-user-select: none;
	}

	.white,
	.blue,
	.red {
		margin: 4px 8px;
		font-size: 24px;
		font-weight: bold;
		line-height: 32px;
	}

	.white {
		color: var(--theme-light-color);
		text-shadow: 0.125px 1px var(--theme-color);
	}

	.blue {
		color: var(--theme-color);
	}

	.red {
		color: var(--accent-color);
	}
</style>
