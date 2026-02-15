<script lang="ts">
import { resolve } from '$app/paths';

import AppFooter from '$lib/AppFooter.svelte';

import t1Image from '$lib/assets/tutorial1.png';
import t2Image from '$lib/assets/tutorial2.png';
import t3Image from '$lib/assets/tutorial3.png';
import t4Image from '$lib/assets/tutorial4.png';
import t5Image from '$lib/assets/tutorial5.png';
import t6Image from '$lib/assets/tutorial6.png';
import t7Image from '$lib/assets/tutorial7.png';
import t8Image from '$lib/assets/tutorial8.png';

let footerHeight: number;
</script>

<svelte:head>
	<link rel="canonical" href="https://qgame.app/games/quantum-tictactoe/tutorial" />
	<title>Tutorial - Quantum Tic-Tac-Toe - Quantum Game Arena</title>
	<meta property="og:url" content="https://qgame.app/games/quantum-tictactoe/tutorial" />
	<meta property="og:title" content="Quantum TTT Tutorial - Quantum Game Arena" />
</svelte:head>

<main style:padding-bottom="{footerHeight + 32}px">
	<h1>Quantum Tic-Tac-Toe Tutorial</h1>

	<section>
		<h2>What is Quantum Tic-Tac-Toe?</h2>
		<p>
			量子三目並べは、量子力学における非局所性を主要なコンセプトとして、三目並べ（○×ゲーム、Tic-Tac-Toe）をもとに作成されたゲームです。
		</p>
		<p>
			量子三目並べでは、（古典）三目並べと同様に<em>（古典）マークを３つ並べたほうの勝利</em
			>となります。<em>ただし、古典マークは直接マークできません</em>。
			<br />
			プレイヤーは古典マークの代わりに「量子マーク」をマークし、これがある規則に従って古典マークに変わります。
		</p>
	</section>

	<section>
		<h2>How to play Quantum Tic-Tac-Toe?</h2>
		<p>実際のゲームの流れに沿ってみていきましょう！</p>
		<ol>
			<li>
				<p>
					<em>X のターンからスタート！</em>
					<br />
					X は「量子マーク」を異なる２つのマス（状態）に重ね合わせてマークします。<em
						>「量子マーク」は、２つのマスに重ね合わさった状態です</em
					>。この時点では２つのマスのどちらにあるのかはまだ確定していません。
				</p>
				<img src={t1Image} alt="初期盤面（プレイヤー X のターンです）" height="200px" />
			</li>
			<li>
				<p>
					<em>続いて Y のターン</em>
					<br />
					同様に量子マークをマークします。
				</p>
				<img
					src={t2Image}
					alt="２ターン目開始時の盤面（プレイヤー Y のターンです）"
					height="200px"
				/>
			</li>
			<li>
				<p>
					X, Y 交互に量子マークを繰り返します。
					<br />
					古典マークは１つのマスに１つしか入りませんが、<em
						>量子マークは、他の量子マークがすでにあるマスに重ねてマークすることもできます</em
					>。
				</p>
				<img src={t3Image} alt="２ターン目終了時の盤面" height="200px" />
				<img src={t4Image} alt="数ターン後に量子マークが多数マークされた盤面" height="200px" />
			</li>
			<li>
				<p>
					<em>循環もつれが発生！</em>
					<br />
					重なり合った量子マークのうち、ある量子マークがどちらのマスにあるか決まれば、他の量子マークのマスも１通りに決まるようなマークの組ができることがあります。これを<dfn
						>「循環もつれ」</dfn
					>といいます。
				</p>
				<img src={t5Image} alt="循環もつれの発生した盤面" height="200px" />
			</li>
			<li>
				<p>
					<em>破れ</em>
					<br />
					循環エンタングルメント状態にある量子マークは直ちに<dfn>「破れ」</dfn
					>が引き起こされます。量子マークの重ね合わせ状態が破れ（<span lang="en">collapse</span
					>）、古典マークになるのです。
					<br />
					循環エンタングルメントを発生させたプレイヤー<em>ではない</em>プレイヤー（X
					がマークしたことで発生した場合は
					Y）が、量子マークを２つの古典状態のうちのどちらにするか決定します<small
						>（量子情報に詳しい方へ向けた註：post selectionと思ってください）</small
					>。
				</p>
				<img src={t6Image} alt="collapse の選択中の盤面" height="200px" />
				<img src={t7Image} alt="collapse の選択後の盤面" height="200px" />
			</li>
			<li>
				<p>
					<em>ゲーム終了‼</em>
					<br />
					通常の（古典）三目並べと同じように、古典マークが１列に３つ並んだ時点でゲームは終了します。<em
						>自分の古典マークを３つ並べたプレイヤーの勝利</em
					>です‼
					<br />
					ただし、量子三目並べでは collapse の後、いくつかの列に同時に古典マークが並ぶことがあります。この場合、できた列に最もあとのターンのマークを有している方の負けとなります。
				</p>
				<img src={t8Image} alt="ゲーム終了時の盤面" height="200px" />
			</li>
		</ol>
	</section>
	<section id="play">
		<h2>Let's play!</h2>
		<p>Quantum Tic-Tac-Toeトップ画面に戻ってさっそく遊んでみましょう！</p>
		<a href={resolve('/games/quantum-tictactoe')} class="play--button">
			<span>Let's Play!</span>
		</a>
	</section>
</main>
<AppFooter bind:h={footerHeight} />

<style>
main {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-left: 8px;
	padding-right: 8px;
	margin: var(--header-height) 0 0;
	width: 100%;
	box-sizing: border-box;

	> h1 {
		text-align: center;
	}

	& section {
		max-width: var(--contents-width);

		h2 {
			text-align: center;
		}
	}
}

h1,
h2 {
	font-weight: bold;
}

em:lang(ja-JP),
dfn:lang(ja-JP) {
	font-style: normal;
	font-weight: bold;
}

.play--button {
	box-sizing: border-box;
	margin: 32px auto;
	height: 48px;
	width: 240px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: var(--theme-color);
	border-radius: 10px;
	border: 2px solid var(--theme-color);
	font-size: 24px;
	font-weight: bold;
	text-align: center;
	color: var(--bg-color);

	&:hover {
		background-color: #f0f7fff0;
		color: var(--theme-color);
	}
}
</style>
