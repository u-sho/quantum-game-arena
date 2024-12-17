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
import type { MarkType } from './QuantumTTT.type';

type GameBoardSquareMarkClassicalProps = { cMark: MarkType };
const { cMark }: GameBoardSquareMarkClassicalProps = $props();
</script>

<div class="classical-mark">
	<span>{cMark[0]}<sub>{cMark[1]}</sub></span>
</div>

<style>
.classical-mark {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: default;
	user-select: none;
	-moz-user-select: none;
	-webkit-user-select: none;
}

span {
	display: block;
	font-size: 60px;
	color: var(--theme-color);
	font-weight: bold;
	line-height: 1;

	& sub {
		font-size: 30px;
	}
}
</style>
