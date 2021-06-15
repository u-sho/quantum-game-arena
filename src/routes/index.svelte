<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import TheHeader from '$lib/TheHeader/index.svelte';
	import TheFooter from '$lib/TheFooter/index.svelte';
</script>

<svelte:head>
	<link rel="canonical" href="https://quantum-game-arena.vercel.app/" />
	<title>Quantum Game Arena</title>
</svelte:head>

<TheHeader />
<article>
	<header class="hero" id="top">
		<h1>Quantum Game Arena</h1>
	</header>
	<section id="about">
		<h1>About</h1>
		<p>
			Quantum Game Arena
			は，ゲームを通じて量子力学的世界観を養うことを目的とした量子ゲームの遊び場です．
		</p>
	</section>
	<section id="games">
		<h1>Games</h1>
		<nav>
			<ul class="game-list">
				<li>
					<a sveltekit:prefetch href="/games/quantum-tictactoe" type="text/html">量子三目並べ</a>
				</li>
				<li class="comming-soon">
					<span>量子囲碁</span>
				</li>
				<li class="comming-soon">
					<span>量子将棋</span>
				</li>
				<li class="comming-soon">
					<span>量子人狼</span>
				</li>
			</ul>
		</nav>
	</section>
</article>
<TheFooter />

<style lang="scss">
	article {
		margin-top: var(--header-height);
	}

	.hero {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 10rem;
		width: 100%;
		background: var(--theme-color);
		h1 {
			color: var(--bg-color);
			font-size: 2.5rem;
		}
	}

	section {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		flex-direction: column;
		&:nth-child(even) {
			background-color: var(--theme-light-color);
		}

		h1 {
			font-weight: bold;
			font-size: 2rem;
			border-bottom: 2px solid var(--theme-color);
		}
		p {
			max-width: 512px;
		}
	}

	.game-list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		max-width: var(--contents-width);
		list-style: none;
		padding: 0;
		margin: 0;
		li {
			list-style-type: none;
			margin: 16px;

			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 125px;
			width: 100px;
			border: 2px solid var(--accent-color);

			a {
				font-weight: bold;
			}
		}
		.comming-soon {
			background: #aaaaaaaa;
			a {
				opacity: 0.5;
			}
		}
	}
</style>
