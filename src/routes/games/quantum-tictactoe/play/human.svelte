<script lang="ts">
	import OfflineApp from '$lib/quantum-tictactoe/OfflineApp.svelte';
</script>

<svelte:head>
	<title>Quantum Tic-Tac-Toe - Quantum Game Arena</title>
</svelte:head>

<div class="container">
	<!-- <ReactDipper styleParams={{ backgroundColor: 'none !important' }} /> -->

	<div class="overlay">
		<div class="withinOverlay">
			<div>
				<div class="board"><OfflineApp /></div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 1;
		top: 0;
	}

	.overlay {
		position: absolute;
		left: 50%;
		top: 50%;
	}
	.withinOverlay {
		position: relative;
		left: -50%;
		margin-top: -25%;
	}

	.board {
		position: relative;
		margin-top: -40%;
	}
</style>
