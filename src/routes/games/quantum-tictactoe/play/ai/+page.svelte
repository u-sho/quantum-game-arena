<script lang="ts">
import AiApp from '$lib/games/quantum-tictactoe/AiApp.svelte';
</script>

<svelte:head>
	<link rel="canonical" href="https://qgame.app/games/quantum-tictactoe/play/ai" />
	<title>Quantum Tic-Tac-Toe - Quantum Game Arena</title>
	<meta property="og:url" content="https://qgame.app/games/quantum-tictactoe/play/ai" />
	<meta property="og:title" content="Quantum Tic-Tac-Toe - Quantum Game Arena" />
</svelte:head>

<main class="main">
	<!-- <SvelteDipper /> -->
	<h1 class="title">Quantum Tic-Tac-Toe</h1>
	<AiApp />
</main>

<style>
.main {
	width: 100%;
	height: 100%;
	min-height: calc(100svh - var(--header-height));
	padding-top: var(--header-height);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
}

.title {
	text-align: center;
}
</style>
