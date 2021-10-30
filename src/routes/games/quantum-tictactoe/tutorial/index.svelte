<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import TheHeader from '$lib/TheHeader/index.svelte';
	import TheFooter from '$lib/TheFooter/index.svelte';
</script>

<svelte:head>
	<link
		rel="canonical"
		href="https://qgame.app/games/quantum-tictactoe/tutorial"
	/>
	<title>Tutorial - Quantum Tic-Tac-Toe - Quantum Game Arena</title>
	<meta
		property="og:url"
		content="https://qgame.app/games/quantum-tictactoe/tutorial"
	/>
	<meta property="og:title" content="Quantum TTT Tutorial - Quantum Game Arena" />
</svelte:head>

<TheHeader />
<main class="main">
	<h1 class="title">How to play Quantum Tic-Tac-Toe?</h1>

	<section>
		<h2>What is Quantum Tic-Tac-Toe?</h2>
		<p>
			量子3目並べは、量子力学における非局所性を主要なコンセプトとして、3目並べ（○×ゲーム、Tic-Tac-Toe）をもとに作成されたゲームです。
		</p>
	</section>

	<section>
		<h2>Tutorial</h2>
		<ol>
			<li>
				<p>
					<em class="ja-jp">X のターンからスタート！</em>
					<br />
					X は「量子マーク」を異なる2つのマス（状態）に重ね合わせてマークします。「
					<dfn class="ja-jp">量子マーク</dfn>」とは状態の確定していないマークを指します。
					「量子マーク」は基本的に2つのマスの重ね合わせ状態にありますが、
					後述の「循環エンタングルメント」になると「collapse」が起こり、
					2つのうちどちらか一方のマスの「古典マーク」になります。
				</p>
			</li>
			<li>
				<p>
					<em class="ja-jp">続いて Y のターン！</em>
					<br />
					同様に「量子マーク」をマークします。
				</p>
			</li>
			<li>
				<p>
					X, Y 交互に「量子マーク」を繰り返します。
					「量子マーク」は、他の「量子マーク」がすでにあるマスに重ねてマークすることも出来ます。
				</p>
			</li>
			<li>
				<p>
					<em class="ja-jp">循環エンタングルメントが発生！</em>
					<br />
					重なり合った「量子マーク」のうち、どれか一つのマークがどちらのマスであるか決まれば、他のマークのマスも1通りに決まるような状態を「
					<dfn class="ja-jp">循環エンタングルメント</dfn>」といいます。
					循環エンタングルメントにある「量子マーク」は直ちに「collapse」が発生します。
					<br />
					「循環エンタングルメント」を発生させたプレイヤー<em class="ja-jp">ではない</em
					>プレイヤー（X をマークしたことで発生した場合、Y
					のプレイヤー）が、マークをどちらの古典状態にするか決定します。
				</p>
			</li>
			<li>
				<p>
					<em class="ja-jp">ゲーム終了！</em>
					<br />
					通常の（古典の）3目並べと同じように、「古典マーク」が1列に3つ並んだ時点でゲームは終了します。
					自分の「古典マーク」を3つ並べたプレイヤーの勝利となります。ただし、量子3目並べでは、「collapse」
					のために、同時にいくつかの列に「古典マーク」が並ぶことがあります。この場合、出来た列それぞれのうち、最もあとのターンのマークを有している方の負けとなります。
				</p>
			</li>
		</ol>
	</section>
</main>
<TheFooter />

<style lang="scss">
	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0;
		margin: var(--header-height) 0 0;
		width: 100%;
		box-sizing: border-box;

		section {
			max-width: var(--contents-width);
		}
	}

	.title {
		font-size: large;
		font-weight: bold;
		text-align: center;
	}

	h2 {
		font-size: larger;
		font-weight: bold;
		text-align: center;
	}

	em.ja-jp,
	dfn.ja-jp {
		font-style: normal;
		font-weight: bold;
	}
</style>
