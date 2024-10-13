<script lang="ts">
// import OnlineApp from '$lib/games/quantum-tictactoe/OnlineApp.svelte';
import OnlineApp from '$lib/games/quantum-tictactoe/OfflineApp.svelte';
</script>

<svelte:head>
	<title>Quantum Tic-Tac-Toe - Quantum Game Arena</title>
	<meta property="og:url" content="https://qgame.app/games/quantum-tictactoe/play/[roomId]" />
	<meta property="og:title" content="Quantum Tic-Tac-Toe - Quantum Game Arena" />
</svelte:head>

<main class="main">
	<!-- <SvelteDipper /> -->
	<h1 class="title">Quantum Tic-Tac-Toe</h1>
	<OnlineApp />
</main>

<style>
.main {
	width: 100%;
	height: 100%;
	margin-top: var(--header-height);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
}

.title {
	text-align: center;
}
</style>
