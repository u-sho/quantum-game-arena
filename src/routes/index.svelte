<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import TheHeader from '$lib/TheHeader/index.svelte';
	import TheFooter from '$lib/TheFooter/index.svelte';

	let img_tictactoe = 'tic-tac-toe.png';
	let img_shogi = 'shogi.png';
	let img_igo = 'igo.png';
</script>

<svelte:head>
	<link rel="canonical" href="https://quantum-game-arena.vercel.app/" />
	<title>Quantum Game Arena</title>
	<meta property="og:url" content="https://quantum-game-arena.vercel.app/" />
	<meta property="og:title" content="Quantum Game Arena" />
</svelte:head>

<TheHeader />
<article>
	<header class="hero" id="top" />
	<section id="about">
		<h1>About</h1>
		<p>
			量子の基本的な概念を取り入れた量子ゲームを登録不要で遊ぶことができるオンライン遊技場です。
			複雑がゆえに、遊びごたえのあるプレイ感を楽しむことができます。
		</p>
	</section>
	<section id="howtoplay">
		<h1>How to Play</h1>
		<ul class="playflow">
			<li>
				<p>Step1</p>
				<p>ゲームを選択</p>
			</li>
			<li>
				<p>Step2</p>
				<p>ルールを読む</p>
			</li>
			<li>
				<p>Step3</p>
				<p>ゲームのプレイ方法を選択</p>
			</li>
			<li />
		</ul>
	</section>
	<section id="games">
		<h1>Games</h1>
		<nav>
			<ul class="game-list">
				<a sveltekit:prefetch href="/games/quantum-tictactoe" type="text/html">
					<li>
						<img src={img_tictactoe} alt="tic-tac-toe" width="130px" />
						<p>量子三目並べ</p>
					</li>
				</a>
				<a sveltekit:prefetch href="/games/shogi" type="text/html" class="disabled">
					<li class="comming-soon">
						<img src={img_shogi} alt="shogi" width="130px" />
						<p>量子将棋</p>
					</li>
				</a>
				<a sveltekit:prefetch href="/games/igo" type="text/html" class="disabled">
					<li class="comming-soon">
						<img src={img_igo} alt="igo" width="130px" />
						<p>量子囲碁</p>
					</li>
				</a>
			</ul>
		</nav>
	</section>
	<section id="play">
		<h2>さあ量子の世界へ...</h2>
		<a sveltekit:prefetch href="/games/quantum-tictactoe" class="play-button"> Play </a>
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
		height: 500px;
		width: 100%;
		background: var(--theme-color);
		background-image: url(top-screen.png);

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
			position: relative;
			color: var(--theme-color);
		}

		h1::after {
			content: '';
			display: block;
			position: absolute;
			left: 50%;
			transform: translate(-50%);
			bottom: -10px;
			width: 30px;
			height: 5px;
			background-color: var(--theme-color);
		}

		p {
			max-width: 512px;
		}
	}

	#about {
		height: 460px;
	}

	#howtoplay {
		height: 700px;
	}

	#games {
		height: 450px;
	}

	#play {
		height: 300px;

		a {
			list-style-type: none;
			margin: 16px;

			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 45px;
			width: 120px;
			background-color: #7a9de3;
			border-radius: 5px;
			font-weight: bold;
			font-size: 1.25rem;
			color: #ffffff;
		}
	}

	.playflow {
		li {
		}
	}

	.game-list {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-left: 0px;

		a {
			li {
				list-style-type: none;
				margin: 1rem;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				height: 250px;
				width: 180px;
				background: #f4f0f0;

				img {
					margin: 1rem;
				}

				p {
					font-weight: bold;
					color: var(--theme-color);
				}
			}
		}

		.comming-soon {
			a {
				opacity: 0.5;
			}
		}
	}

	.disabled {
		pointer-events: none;
	}
</style>
