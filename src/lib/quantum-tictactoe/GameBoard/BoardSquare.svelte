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
