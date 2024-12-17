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
import type { MaxLengthArray } from '$lib/types/generics';

import type { MarkType } from './QuantumTTT.type';

type GameInfoProps = {
	// Contains marks in selected square if collapse ongoing
	choices: MaxLengthArray<MarkType, 3> | undefined;
	// Passes selected choice of mark up to Game.handleCollapse
	onChoiceClick: (choice: MarkType) => void;
	// Conveys player information about the state of the game
	status: string;
	isGameOver: boolean;
	scores: { X: number; Y: number };
	// Go to next game with scores
	onNextGameClick: () => void;
	// Reset scores & Go to new game
	onResetGameClick: () => void;
};
const {
	choices,
	onChoiceClick,
	status,
	isGameOver,
	scores,
	onNextGameClick,
	onResetGameClick
}: GameInfoProps = $props();

type GameInfoButtonProps = {
	buttonClass: 'next-game' | 'reset-game' | 'collapse-choice';
	choice?: MarkType;
	onClick: () => void;
};
</script>

{#snippet gameInfoButton({ buttonClass, choice, onClick }: GameInfoButtonProps)}
	<div
		class="btn {buttonClass}"
		onclick={(e: MouseEvent): void => {
			e.preventDefault();
			onClick();
		}}
		onkeypress={(e: KeyboardEvent): void => {
			if (e.key !== 'Enter' && e.key !== ' ') return;
			e.preventDefault();
			onClick();
		}}
		role="button"
		tabindex="0"
	>
		<span class="btn-text">
			{#if buttonClass === 'collapse-choice' && choice}
				{choice[0]}<sub>{choice[1]}</sub>
			{:else if buttonClass === 'next-game'}
				Next
			{:else if buttonClass === 'reset-game'}
				Reset
			{/if}
		</span>
	</div>
{/snippet}

<div class="game-info">
	<p class="status">{status}</p>

	{#if choices}
		<div class="btn-list">
			{#each choices as choice (choice)}
				<!-- eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -->
				{@render gameInfoButton({
					buttonClass: 'collapse-choice',
					choice,
					onClick: (): void => onChoiceClick(choice)
				})}
			{/each}
		</div>
	{/if}

	{#if isGameOver}
		<div class="btn-list">
			<!-- eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -->
			{@render gameInfoButton({ buttonClass: 'reset-game', onClick: onResetGameClick })}

			<!-- eslint-disable-next-line @typescript-eslint/no-confusing-void-expression -->
			{@render gameInfoButton({ buttonClass: 'next-game', onClick: onNextGameClick })}
		</div>
	{/if}

	<div class="scores">
		Current scores:
		<span>X: {scores.X}</span>,
		<span>Y: {scores.Y}</span>
	</div>
</div>

<style>
.game-info {
	margin: 0 20px 0;
	top: 0px;
	width: 480px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: stretch;

	@media screen and (max-width: 600px) {
		margin-left: auto;
		margin-right: auto;
		width: 90vw;
	}
}

.status {
	box-sizing: border-box;
	padding: 8px 0;
	font-size: 24px;
	@media screen and (max-width: 600px) {
		font-size: 16px;
	}
}

.btn-list {
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin: 12px 0;
}

.btn {
	box-sizing: border-box;
	margin: 5px;
	padding: 0;
	width: 160px;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 2px solid;
	text-align: center;
	cursor: pointer;

	& .btn-text {
		font-size: 24px;
		line-height: 50px;
	}
}

.collapse-choice {
	background-color: var(--bg-color);
	border-color: var(--accent-color);
	color: var(--accent-color);
	font-weight: bold;
	padding-left: 4px;
	user-select: none;

	&:hover {
		background-color: var(--accent-color);
		color: var(--bg-color);
	}

	& sub {
		font-size: 16px;
		line-height: 16px;
	}
}

.reset-game {
	background-color: var(--bg-color);
	border-color: var(--accent-color);
	color: var(--accent-color);
	&:hover {
		background-color: var(--accent-color);
		color: var(--bg-color);
	}
}

.next-game {
	background-color: var(--bg-color);
	border-color: var(--theme-color);
	color: var(--theme-color);
	font-weight: bold;
	&:hover {
		color: var(--bg-color);
		background-color: var(--theme-color);
	}
}

.scores {
	box-sizing: border-box;
	border-top: 2px solid var(--theme-color);
	padding-top: 12px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 24px;
	font-weight: bold;

	@media screen and (max-width: 600px) {
		padding-left: 4px;
		padding-right: 4px;
		font-size: 16px;
	}
}
</style>
