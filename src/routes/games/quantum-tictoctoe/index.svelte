<script context="module" lang="ts">
	export const prerender = true;
</script>

<svelte:head>
	<title>Qunatum Tic-Toc-Toe - Quantum Game Arena</title>
</svelte:head>

<h1>Quantum Tic-Toc-Toe</h1>
<ul class="nav">
	<li>
		<a
			class="btn"
			sveltekit:prefetch
			href="/games/quantum-tictocote/tutorial"
			type="text/html;charset=utf-8">チュートリアル</a
		>
	</li>
	<li>
		<a
			class="btn"
			sveltekit:prefetch
			href="/games/qunatum-tictoctoe/play/human"
			type="application/ecmascript">オフライン対局</a
		>
	</li>
	<li class="comming-soon"><span class="btn">オンライン対局</span></li>
</ul>

<!-- <menu>
	<li>seetings</li>
	<li>license</li>
	<li>share</li>
	<li>help</li>
</menu> -->
<style lang="scss">
	h1 {
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
