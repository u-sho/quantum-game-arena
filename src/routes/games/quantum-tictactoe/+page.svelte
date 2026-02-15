<script lang="ts">
import { resolve } from '$app/paths';
import AppFooter from '$lib/AppFooter.svelte';

let footerHeight: number;
</script>

<svelte:head>
	<link rel="canonical" href="https://qgame.app/games/quantum-tictactoe" />
	<title>Quantum Tic-Tac-Toe - Quantum Game Arena</title>
	<meta property="og:url" content="https://qgame.app/games/quantum-tictactoe" />
	<meta property="og:title" content="Quantum Tic-Tac-Toe - Quantum Game Arena" />
</svelte:head>

<main style:padding-bottom="{footerHeight}px">
	<h1>Quantum Tic-Tac-Toe</h1>
	<ul>
		<li>
			<a href={resolve('/games/quantum-tictactoe/tutorial')} type="text/html;charset=utf-8"
				>チュートリアル</a
			>
		</li>
		<li>
			<a href={resolve('/games/quantum-tictactoe/play/ai')} type="application/ecmascript">AI対局</a>
		</li>
		<li>
			<a href={resolve('/games/quantum-tictactoe/play/human')} type="application/ecmascript"
				>オフライン対局</a
			>
		</li>
		<li class="coming-soon"><span>オンライン対局</span></li>
	</ul>
</main>
<AppFooter bind:h={footerHeight}>
	<!-- TODO: <menu>
	<li>settings</li>
	<li>license</li>
	<li>share</li>
	<li>help</li>
</menu> -->
</AppFooter>

<style>
main {
	display: flex;
	flex-direction: column;
	padding: var(--header-height) 0 0;
	margin: 0;
	width: 100%;
	box-sizing: border-box;

	> h1 {
		text-align: center;
	}

	> ul {
		text-align: center;
		padding: 0;

		& li {
			list-style-type: none;
			box-sizing: border-box;
			margin: 1.5rem;
			padding: auto;

			> a,
			> span {
				display: inline-block;
				box-sizing: border-box;
				border-radius: 1.2rem;
				width: 11rem;
				height: 2.5rem;
				line-height: 2.5rem;
				font-size: 1.25rem;
				background-color: var(--theme-color);
				color: white;
			}

			> span {
				cursor: not-allowed;
			}
		}

		& .coming-soon {
			opacity: 0.5;
		}
	}
}
</style>
