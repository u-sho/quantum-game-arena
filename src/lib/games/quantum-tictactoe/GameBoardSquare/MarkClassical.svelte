<script lang="ts">
	import type { MarkType } from '$lib/games/quantum-tictactoe/QuantumTTT.type';

	export let cMark: MarkType;
</script>

<div class="classical-mark">
	<span>{cMark[0]}<sub>{cMark[1]}</sub></span>
</div>

<style lang="scss">
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

		sub {
			font-size: 30px;
		}
	}
</style>
