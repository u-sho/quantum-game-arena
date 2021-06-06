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

