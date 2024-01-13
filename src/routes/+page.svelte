<script lang="ts">
import AppFooter from '$lib/AppFooter.svelte';

import LogoTitleRowWhite from '$lib/assets/logo-title_row-white.svg.svelte';
import heroImage from '$lib/assets/hero.webp';
import goGameImage from '$lib/assets/gogame.webp';
import shogiImage from '$lib/assets/shogi.webp';
import tictactoeImage from '$lib/assets/tic-tac-toe.webp';

import { scrollTo } from 'svelte-scrollto';

let footerHeight: number;

const scrollToAbout = (): void => {
	scrollTo({
		element: '#about',
		offset: -64,
		duration: 1500
	});
};
</script>

<svelte:head>
	<link rel="canonical" href="https://qgame.app" />
	<title>Quantum Game Arena</title>
	<meta property="og:url" content="https://qgame.app" />
	<meta property="og:title" content="Quantum Game Arena" />
</svelte:head>

<article style="padding-bottom: {footerHeight}px;">
	<header class="hero" id="top">
		<img src={heroImage} alt="" />
		<LogoTitleRowWhite
			styles="width: 100%; max-width: var(--contents-width-text); margin: 0 10px 20vh 10px; z-index: 1;"
		/>
		<a data-sveltekit-noscroll href="/#about" on:click={scrollToAbout} class="btn_03">
			<span>Start</span>
		</a>
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
					<a href="/games/quantum-tictactoe" type="text/html">
						<img src={tictactoeImage} alt="tic-tac-toe" width="130px" height="130px" />
						<span>量子三目並べ</span>
					</a>
				</li>
				<li>
					<div class="coming-soon">
						<img src={shogiImage} alt="shogi" width="130px" height="130px" />
						<span>量子将棋</span>
					</div>
				</li>
				<li>
					<div class="coming-soon">
						<img src={goGameImage} alt="igo" width="130px" height="130px" />
						<span>量子囲碁</span>
					</div>
				</li>
			</ul>
		</nav>
	</section>
	<section id="play">
		<h1 class="play--title">さあ量子の世界へ...</h1>
		<a href="/games/quantum-tictactoe" class="play--button">
			<span>Play</span>
		</a>
	</section>
</article>
<AppFooter bind:h={footerHeight} />

<style lang="scss">
a.btn_03 {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 50px;
	position: relative;
	background: #228bc8;
	border: 1px solid #228bc8;
	border-radius: 30px;
	box-sizing: border-box;
	// padding: 0 25px 0 25px;
	color: #fff;
	font-size: 24px;
	letter-spacing: 0.1em;
	transition-duration: 0.3s;
	&:hover {
		background: #228bc8;
		color: #fff;
	}

	span {
		line-height: 1;
	}
}
article {
	margin-top: var(--header-height);
}

.hero {
	position: relative;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
	min-height: 417px;
	background-color: var(--theme-color);
	overflow: hidden;

	img {
		display: block;
		height: 100%;
		margin-right: 50px;
		position: absolute;
		z-index: 0;
	}

	a {
		position: absolute;
		margin-top: 40vh;
		width: 250px;
		height: 50px;
		background-color: var(--theme-color);
		z-index: 1;
	}
}

section {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	padding: var(--header-height) 0;
	scroll-margin-top: var(--header-height);

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

.playflow {
	list-style-type: none;
	li > p:first-child {
		font-weight: bold;
		color: var(--theme-color);
		margin-left: 0;
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
		--card-bg-color: #f4f0f0;
		--card-bg-color-rgb: 244, 240, 240;
		--card-bg-color-hover: #f6f2f2;

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
			background-color: var(--card-bg-color);
			color: var(--theme-color);
			box-sizing: border-box;

			&:hover {
				background-color: var(--card-bg-color-hover);
				border: 2px solid var(--theme-light-color);
			}
		}

		.coming-soon {
			position: relative;
			background-color: rgba(var(--card-bg-color-rgb), 0.6);
			color: rgba(var(--theme-color-rgb), 0.8);

			&::after {
				content: 'coming soon';
				position: absolute;
				top: 100px;
				text-align: center;
				font-size: 24px;
				font-weight: bold;
				color: rgba(var(--theme-color-rgb), 0.9);
				z-index: 1;
			}
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
	height: 48px;
	width: 180px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: var(--theme-color);
	border-radius: 10px;
	font-size: 24px;
	font-weight: bold;
	text-align: center;
	color: #ffffff;

	&:hover {
		background-color: var(--theme-light-color);
	}
}
</style>
