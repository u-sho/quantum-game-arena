<script lang="ts">
	import OfflineApp from '$lib/game/quantum-tictactoe/OfflineApp.svelte';
	import TheHeader from '$lib/TheHeader/index.svelte';
</script>

<svelte:head>
	<title>Quantum Tic-Tac-Toe - Quantum Game Arena</title>
</svelte:head>

<TheHeader />
<main>
	<!-- <SvelteDipper /> -->
	<h1 class="title">Quantum Tic-Tac-Toe</h1>
	<OfflineApp />
</main>

<style lang="scss">
	main {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
