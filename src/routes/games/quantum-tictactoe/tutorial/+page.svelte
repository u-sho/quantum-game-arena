<script lang="ts">
import TheHeader from '$lib/TheHeader/index.svelte';
import TheFooter from '$lib/TheFooter/index.svelte';

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
	<link rel="manifest" href="https://qgame.app/games/quantum-tictactoe/manifest.webmanifest" />
	<title>Tutorial - Quantum Tic-Tac-Toe - Quantum Game Arena</title>
	<meta property="og:url" content="https://qgame.app/games/quantum-tictactoe/tutorial" />
	<meta property="og:title" content="Quantum TTT Tutorial - Quantum Game Arena" />
</svelte:head>

<TheHeader />
<main class="main" style="padding-bottom:{footerHeight}px">
	<h1 class="title">Quantum Tic-Tac-Toe Tutorial</h1>

	<section>
		<h2>What is Quantum Tic-Tac-Toe?</h2>
		<p>
			量子三目並べは、量子力学における非局所性を主要なコンセプトとして、三目並べ（○×ゲーム、Tic-Tac-Toe）をもとに作成されたゲームです。
		</p>
		<p>
			量子三目並べでは、（古典）三目並べと同様に<em class="ja-jp"
				>（古典）マークを３つ並べたほうの勝利</em
			>となります。<em class="ja-jp">ただし、古典マークを直接マークすることはできません</em>。
			<br />
			プレイヤーは古典マークの代わりに「量子マーク」をマークし、これがある規則に従って古典マークに変わります。
		</p>
		<p>詳しく見ていきましょう！</p>
	</section>

	<section>
		<h2>How to play Quantum Tic-Tac-Toe?</h2>
		<ol>
			<li>
				<p>
					<em class="ja-jp">X のターンからスタート！</em>
					<br />
					X は「量子マーク」を異なる２つのマス（状態）に重ね合わせてマークします。<em class="ja-jp"
						><dfn class="ja-jp">「量子マーク」</dfn
						>とは、位置が２つのマスに重ね合わさった（古典）マークのことです</em
					>。この時点では２つのマスのどちらにあるのかはまだ確定していません。
				</p>
				<img src={t1Image} alt="初期盤面（プレイヤー X のターンです）" height="200px" />
			</li>
			<li>
				<p>
					<em class="ja-jp">続いて Y のターン</em>
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
					<em class="ja-jp">古典マークは１つのマスに１つしか入りません</em>が、<em class="ja-jp"
						>量子マークは、他の量子マークがすでにあるマスに重ねてマークすることもできます</em
					>。
				</p>
				<img src={t3Image} alt="２ターン目終了時の盤面" height="200px" />
				<img src={t4Image} alt="数ターン後に量子マークが多数マークされた盤面" height="200px" />
			</li>
			<li>
				<p>
					<em class="ja-jp">循環もつれが発生！</em>
					<br />
					重なり合った量子マークのうち、ある量子マークが２つのうち片方のマスの古典マークであって、もう片方のマスではないかが決まれば、別の量子マークのマスも１通りに決まるようなマークの組ができることがあります。これを<dfn
						class="ja-jp">「循環もつれ」</dfn
					>といいます。
				</p>
				<img src={t5Image} alt="循環もつれの発生した盤面" height="200px" />
			</li>
			<li>
				<p>
					<em class="ja-jp">Collapse</em>
					<br />
					循環エンタングルメント状態にある量子マークは直ちに<dfn class="ja-jp">「collapse」</dfn
					>が引き起こされます。量子マークの<dfn class="ja-jp"
						>重ね合わせ状態が崩壊（collapse）し、古典マークになる</dfn
					>のです。
					<br />
					循環エンタングルメントを発生させたプレイヤー<em class="ja-jp">ではない</em>プレイヤー（X
					をマークしたことで発生した場合は
					Y）が、量子マークを２つの古典状態のうちのどちらにするか決定します。
				</p>
				<img src={t6Image} alt="collapse の選択中の盤面" height="200px" />
				<img src={t7Image} alt="collapse の選択後の盤面" height="200px" />
			</li>
			<li>
				<p>
					<em class="ja-jp">ゲーム終了‼</em>
					<br />
					通常の（古典）三目並べと同じように、古典マークが１列に３つ並んだ時点でゲームは終了します。<em
						class="ja-jp">自分の古典マークを３つ並べたプレイヤーの勝利</em
					>です‼　ただし、量子三目並べでは collapse
					の後、いくつかの列に同時に古典マークが並ぶことがあります。この場合、できた列に最もあとのターンのマークを有している方の負けとなります。
				</p>
				<img src={t8Image} alt="ゲーム終了時の盤面" height="200px" />
			</li>
		</ol>
	</section>
	<!-- TODO
		<a
			class="btn"
			
			href="/games/quantum-tictactoe/play/human"
			type="application/ecmascript"
		>
			Let's play!
		</a>
	-->
</main>
<TheFooter bind:h={footerHeight} />

<style lang="scss">
.main {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 0 200px;
	margin: var(--header-height) 0 0;
	width: 100%;
	box-sizing: border-box;

	section {
		max-width: var(--contents-width);
	}
}

.title {
	font-weight: bold;
	text-align: center;
}

h2 {
	font-weight: bold;
	text-align: center;
}

em.ja-jp,
dfn.ja-jp {
	font-style: normal;
	font-weight: bold;
}
</style>
