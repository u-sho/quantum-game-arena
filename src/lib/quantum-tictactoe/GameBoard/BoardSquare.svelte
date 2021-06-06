<script lang="ts">
	import type { StateType } from '$lib/quantum-tictactoe/Game';

	export let cMark: StateType['cSquares'][0];
	export let qMarks: StateType['qSquares'][0];
	export let cycleMarks: StateType['cycleMarks'];
	export let isHighlighted: boolean;
	export let isBeingCollapsed: boolean;
	export let onClick: svelte.JSX.MouseEventHandler<HTMLDivElement>;

	import QuantumMarks from './QuantumMarks.svelte';

	$: squareClass = cMark
		? 'square classical'
		: `square${isHighlighted ? ' rotating-dashed' : ''}${isBeingCollapsed ? ' selected' : ''}`;

	$: marksClass = cMark ? 'marks adjustCenter' : 'marks';
</script>

<div class={squareClass} on:click={onClick}>
	<div>
		<span class="dashing"><i /></span>
		<span class="dashing"><i /></span>
		<span class="dashing"><i /></span>
		<span class="dashing"><i /></span>
	</div>
	<div class={marksClass}>
		{#if cMark}
			{cMark[0]}<sub>{cMark[1]}</sub>
		{:else}
			<QuantumMarks {isHighlighted} {isBeingCollapsed} {qMarks} {cycleMarks} />
		{/if}
	</div>
</div>

<style lang="scss">
	.marks {
		margin: 5px;
		margin-top: 5px;
	}

	.adjustCenter {
		margin-top: 20px;
		margin-left: 30px;
	}

	.square {
		background: #374046;
		border: 2px solid #999;
		float: left;
		font-size: 24px;
		font-weight: bold;
		line-height: 34px;
		height: 160px;
		width: 160px;
		margin-right: -1px;
		margin-top: -1px;
		border-color: #00bbd3;
		user-select: none;
	}

	.classical {
		font-size: 60px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.selected {
		color: #e74c3c;
	}

	.rotating-dashed {
		position: relative;
		overflow: hidden;
		color: #00bbd3;
	}

	.dashing {
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
	}

	i {
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		width: 200%;
		border-bottom: 5px dashed;
		animation: slideDash 2.5s infinite linear;
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
