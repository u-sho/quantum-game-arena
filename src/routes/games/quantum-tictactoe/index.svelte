<script lang="ts">
	import TheHeader from '$lib/TheHeader/index.svelte';
	import TheFooter from '$lib/TheFooter/index.svelte';
</script>

<svelte:head>
	<link rel="canonical" href="https://qgame.app/games/quantum-tictactoe/" />
	<title>Quantum Tic-Tac-Toe - Quantum Game Arena</title>
	<meta property="og:url" content="https://qgame.app/games/quantum-tictactoe/" />
	<meta property="og:title" content="Quantum Tic-Tac-Toe - Quantum Game Arena" />
</svelte:head>

<TheHeader />
<main class="main">
	<h1 class="main--title">Quantum Tic-Tac-Toe</h1>
	<ul class="nav">
		<li>
			<a
				class="btn"
				sveltekit:prefetch
				href="/games/quantum-tictactoe/tutorial"
				type="text/html;charset=utf-8">チュートリアル</a
			>
		</li>
		<li>
			<a
				class="btn"
				sveltekit:prefetch
				href="/games/quantum-tictactoe/play/human"
				type="application/ecmascript">オフライン対局</a
			>
		</li>
		<li class="coming-soon"><span class="btn">オンライン対局</span></li>
	</ul>
</main>
<TheFooter>
	<!--TODO: <menu>
	<li>settings</li>
	<li>license</li>
	<li>share</li>
	<li>help</li>
</menu> -->
</TheFooter>

<style lang="scss">
	.main {
		display: flex;
		flex-direction: column;
		padding: var(--header-height) 0 0;
		margin: 0;
		width: 100%;
		box-sizing: border-box;
	}

	.main--title {
		text-align: center;
	}

	.nav {
		text-align: center;
		li {
			list-style-type: none;
			box-sizing: border-box;
			margin: 1.5rem;
			padding: auto;

			.btn {
				display: inline-block;
				box-sizing: border-box;
				border-radius: 1.2rem;
				width: 11rem;
				height: 2.5rem;
				line-height: 2.5rem;
				font-size: 1.25rem;
				background-color: var(--theme-color);
				color: var(--bg-color);
			}
		}

		.coming-soon {
			opacity: 0.5;
		}
	}
</style>
