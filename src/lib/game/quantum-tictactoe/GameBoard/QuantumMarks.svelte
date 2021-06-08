<script lang="ts">
	import type { StateType, TurnType } from '$lib/game/quantum-tictactoe/Game';

	export let qMarks: StateType['qSquares'][0];
	export let cycleMarks: TurnType[] | null;
	export let isHighlighted: boolean;
	export let isBeingCollapsed: boolean;

	$: marks = qMarks?.filter((x) => x) || [];

	function spanClass(mark: TurnType) {
		if (cycleMarks?.includes(mark)) {
			if (isBeingCollapsed) return 'red';
			if (isHighlighted) return 'blue';
		}
		return 'white';
	}
</script>

{#each marks as m, i (m)}
	<span class={spanClass(m)}>{m[0]}<sub>{m[1]}</sub>{i === marks.length - 1 ? '' : ', '}</span>
{/each}

<style lang="scss">
	.white {
		color: #e0e0e0;
	}

	.blue {
		color: var(--theme-color);
	}

	.red {
		color: var(--accent-color);
	}
</style>
