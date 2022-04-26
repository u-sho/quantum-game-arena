<script lang="ts">
	import TheHeader from '$lib/TheHeader/index.svelte';
	import TheFooter from '$lib/TheFooter/index.svelte';

	import LogoTitleRowWhite from '$lib/assets/logo-title_row-white.svg.svelte';
	import heroImage from '$lib/assets/hero.png';
	import goGameImage from '$lib/assets/gogame.png';
	import shogiImage from '$lib/assets/shogi.png';
	import tictactoeImage from '$lib/assets/tic-tac-toe.png';
</script>

<svelte:head>
	<link rel="canonical" href="https://qgame.app/" />
	<title>Quantum Game Arena</title>
	<meta property="og:url" content="https://qgame.app/" />
	<meta property="og:title" content="Quantum Game Arena" />
</svelte:head>

<TheHeader />
<article>
	<header class="hero" id="top">
		<img src={heroImage} alt="" height="500px" />
		<LogoTitleRowWhite styles="max-width: var(--contents-width-text); margin:16px; z-index: 1;" />
		<h1>Quantum Game Arena</h1>
	</header>
	<section id="about">
		<h1 class="section-title">About</h1>
		<p>
			Quantum Game Arena
			は、「量子ゲーム」をアカウント登録なしで遊ぶことができるオンライン遊技場です。
			<br />
			量子力学の基本的な概念を取り入れた「量子ゲーム」では，その複雑ゆえに遊びごたえのあるプレイ感を楽しめます。
		</p>
	</section>
	<section id="howtoplay">
		<h1 class="section-title">How to Play</h1>
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
		</ul>
	</section>
	<section id="games">
		<h1 class="section-title">Games</h1>
		<nav>
			<ul class="game-list">
				<li>
					<a sveltekit:prefetch href="/games/quantum-tictactoe" type="text/html">
						<img src={tictactoeImage} alt="tic-tac-toe" width="130px" />
						<span>量子三目並べ</span>
					</a>
				</li>
				<li>
					<div class="coming-soon">
						<img src={shogiImage} alt="shogi" width="130px" />
						<span>量子将棋</span>
					</div>
				</li>
				<li>
					<div class="coming-soon">
						<img src={goGameImage} alt="igo" width="130px" />
						<span>量子囲碁</span>
					</div>
				</li>
			</ul>
		</nav>
	</section>
	<section id="play">
		<h1 class="play--title">さあ量子の世界へ...</h1>
		<a sveltekit:prefetch href="/games/quantum-tictactoe" class="play--button">
			<span>Play</span>
		</a>
	</section>
</article>
<TheFooter />

<style lang="scss">
	article {
		margin-top: var(--header-height);
	}

	.hero {
		position: relative;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 500px;
		width: 100vw;
		background-color: var(--theme-color);
		overflow: hidden;

		img {
			position: absolute;
			overflow: hidden;
			height: 100%;
			z-index: 0;
		}

		h1 {
			width: 0;
			height: 0;
			overflow: hidden;
		}
	}

	section {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 100%;
		padding: 28px 0;

		&:nth-child(even) {
			background-color: var(--bg-light-color);
		}

		p {
			max-width: var(--contents-width-text);
			margin: 16px;
		}
	}

	.section-title {
		margin-top: 0;
		font-weight: bold;
		font-size: 32px;
		position: relative;
		color: var(--theme-color);

		&::after {
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
	}

	.game-list {
		display: flex;
		align-items: center;
		justify-content: space-around;
		flex-wrap: wrap;
		max-width: var(--contents-width);
		list-style: none;
		padding: 0;
		margin: 0;

		li {
			list-style-type: none;
			margin: 16px;
			box-sizing: border-box;

			a,
			.coming-soon {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				width: 180px;
				height: 250px;

				img {
					margin: 16px 16px 0;
				}
				span {
					margin: 0 0 16px;
					font-weight: bold;
				}
			}

			a {
				background-color: #f4f0f0;
				color: var(--theme-color);
			}
		}
		.coming-soon {
			background-color: #f4f0f0aa;

			position: relative;
			color: #1a5086aa;

			&::after {
				content: 'coming soon';
				position: absolute;
				top: 100px;
				text-align: center;
				font-size: 24px;
				font-weight: bold;
				color: var(--theme-color);
				z-index: 1;
			}
		}
	}

	.play--title {
		margin-top: 16px;
		font-size: 24px;
		color: inherit;
		&::after {
			display: none;
		}
	}
	.play--button {
		box-sizing: border-box;
		margin: 16px;
		height: 45px;
		width: 120px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--theme-light-color);
		border-radius: 5px;
		font-size: 20px;
		font-weight: bold;
		text-align: center;
		color: #ffffff;
	}
</style>
