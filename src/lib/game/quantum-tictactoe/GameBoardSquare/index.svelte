<script lang="ts">
	import QuantumMarks from './MarkQuantums.svelte';
	import ClassicalMark from './MarkClassical.svelte';
	import type { StateType } from '$lib/game/quantum-tictactoe/Game';

	export let cMark: StateType['cSquares'][0];
	export let qMarks: StateType['qSquares'][0];
	export let cycleMarks: StateType['cycleMarks'];
	export let isHighlighted: boolean;
	export let isBeingCollapsed: boolean;
	export let onClick: () => void;

	$: squareClass = cMark
		? 'square'
		: `square${isHighlighted ? ' highlighted' : ''}${isBeingCollapsed ? ' selected' : ''}`;
</script>

<div class={squareClass} on:click|preventDefault={(_) => onClick()}>
	<div>
		<span class="border-dashing"><i /></span>
		<span class="border-dashing"><i /></span>
		<span class="border-dashing"><i /></span>
		<span class="border-dashing"><i /></span>
	</div>
	{#if cMark}
		<ClassicalMark {cMark} />
	{/if}
	{#if qMarks}
		<QuantumMarks {isHighlighted} {isBeingCollapsed} {qMarks} {cycleMarks} />
	{/if}
</div>

<style lang="scss">
	.square {
		background: var(--bg-color);
		border: 2px solid var(--theme-color);
		height: 160px;
		width: 160px;
		margin: -1px;
	}

	.selected {
		color: var(--accent-color);
	}

	.highlighted {
		position: relative;
		overflow: hidden;
		color: var(--theme-color);

		.border-dashing {
			display: block;
			width: 100%;
			height: 100%;
			position: absolute;

			&:nth-of-type(1) {
				transform: rotate(0deg);
			}
			&:nth-of-type(2) {
				transform: rotate(90deg);
			}
			&:nth-of-type(3) {
				transform: rotate(180deg);
			}
			&:nth-of-type(4) {
				transform: rotate(270deg);
			}

			i {
				border-bottom: 5px dashed var(--theme-color);
				display: block;
				position: absolute;
				left: 0;
				top: 0;
				width: 200%;
				animation: slideDash 2.5s infinite linear;
			}
		}
	}

	@keyframes slideDash {
		from {
			transform: translateX(-50%);
		}
		to {
			transform: translateX(0%);
		}
	}
</style>
