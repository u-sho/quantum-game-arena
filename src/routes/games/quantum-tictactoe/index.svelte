<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import AppHeader from '$lib/AppHeader/index.svelte';
	import AppFooter from '$lib/AppFooter/index.svelte';
</script>

<svelte:head>
	<title>Quantum Tic-Tac-Toe - Quantum Game Arena</title>
</svelte:head>

<AppHeader />
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
		<li class="comming-soon"><span class="btn">オンライン対局</span></li>
	</ul>
</main>
<AppFooter>
	<!--TODO: <menu>
	<li>seetings</li>
	<li>license</li>
	<li>share</li>
	<li>help</li>
</menu> -->
</AppFooter>

<style lang="scss">
	.main {
		display: flex;
		flex-direction: column;
		padding: 0;
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
				width: 10rem;
				height: 2.5rem;
				line-height: 1.5;
				font-size: 1.25rem;
				background-color: var(--theme-color);
				color: var(--bg-color);
			}
		}

		.comming-soon {
			opacity: 0.5;
		}
	}
</style>
