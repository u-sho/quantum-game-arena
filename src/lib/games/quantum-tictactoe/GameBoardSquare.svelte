<!--
	QuantumTicTacToe is made by Rohan Pandit in 2017 and changed by Shouhei Uechi in 2021.
		Copyright (C) 2021  Shouhei Uechi
		Copyright (C) 2017  Rohan Pandit, available at <https://github.com/rohanp/QuantumTicTacToe/tree/master/>

	This file is part of QuantumTicTacToe.

	QuantumTicTacToe is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	QuantumTicTacToe is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with QuantumTicTacToe.  If not, see <https://www.gnu.org/licenses/>.
-->
<script lang="ts">
import QuantumMarks from './GameBoardSquareMarkQuantums.svelte';
import ClassicalMark from './GameBoardSquareMarkClassical.svelte';
import type { StateType } from './QuantumTTT.type';

export let cMark: StateType['cSquares'][0];
export let qMarks: StateType['qSquares'][0];
export let cycleMarks: StateType['cycleMarks'];
export let isHighlighted: boolean;
export let isBeingCollapsed: boolean;
export let onClick: () => void;

export let squareName: `${'upper' | 'middle' | 'lower'} ${'left' | 'center' | 'right'} square`;

$: squareClass = cMark
	? 'square'
	: `square${isHighlighted ? ' highlighted' : ''}${isBeingCollapsed ? ' selected' : ''}`;

$: ariaLabel = `${cMark ? `Classical ${cMark}` : qMarks.length > 0 ? `Quantum ${qMarks.join(', ')}` : ''} on ${squareName}`;
</script>

<div
	class={squareClass}
	on:click|preventDefault={onClick}
	on:keypress|preventDefault={onClick}
	aria-label={ariaLabel}
	role="button"
	tabindex="0"
>
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

<style>
.square {
	background: var(--bg-color);
	border: 2px solid var(--theme-color);
	height: 160px;
	width: 160px;
	margin: -1px;

	@media screen and (max-width: 600px) {
		width: 30vw;
		height: 30vw;
	}
}

.selected {
	color: var(--accent-color);
}

.highlighted {
	position: relative;
	overflow: hidden;
	color: var(--theme-color);

	& .border-dashing {
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

		& i {
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
