<script lang="ts">
	import TheHeader from '$lib/TheHeader/index.svelte';
	import OfflineApp from '$lib/games/quantum-tictactoe/OfflineApp.svelte';
</script>

<svelte:head>
	<link
		rel="canonical"
		href="https://quantum-game-arena.vercel.app/games/quantum-tictactoe/play/human"
	/>
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
		justify-content: space-between;
	}
</style>
