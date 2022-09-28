<script lang="ts">
import TheHeader from '$lib/TheHeader/index.svelte';
import OfflineApp from '$lib/games/quantum-tictactoe/OfflineApp.svelte';
</script>

<svelte:head>
	<link rel="canonical" href="https://qgame.app/games/quantum-tictactoe/play/human" />
	<link rel="manifest" href="/games/quantum-tictactoe/manifest.webmanifest" />
	<title>Quantum Tic-Tac-Toe - Quantum Game Arena</title>
	<meta property="og:url" content="https://qgame.app/games/quantum-tictactoe/play/human" />
	<meta property="og:title" content="Quantum Tic-Tac-Toe - Quantum Game Arena" />
</svelte:head>

<TheHeader />
<main class="main">
	<!-- <SvelteDipper /> -->
	<h1 class="title">Quantum Tic-Tac-Toe</h1>
	<OfflineApp />
</main>

<style lang="scss">
.main {
	width: 100%;
	height: 100%;
	margin-top: var(--header-height);
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
}
</style>
