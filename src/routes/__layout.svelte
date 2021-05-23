<script lang="ts">
	import Header from '$lib/Header/index.svelte';
</script>

<Header />
<main>
	<slot />
</main>
<footer>
	<div class="footer__logo">
		<a sveltekit:prefetch href="/#top">
			<img src="logo-144x144.png" alt="QuantumGameArena" />
			<h1 class="footer__title">Quantum Game Arena</h1>
		</a>
	</div>
	twitter
</footer>

<style lang="scss">
	:root {
		--theme-color: #7a9de3;
		--theme-light-color: #f0f7ff;
		--accent-color: #8b0204;
		--bg-color: #ffffff;
	}

	:global(body) {
		margin: 0;
		padding: 0;
	}

	:global(a) {
		text-decoration: none;
	}

	main {
		display: flex;
		flex-direction: column;
		padding: 0;
		margin: 0;
		width: 100%;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
		background-color: var(--theme-color);
		@media (min-width: 480px) {
			padding: 40px 0;
		}
	}

	.footer__logo a {
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;

		img {
			height: 2rem;
		}
	}
</style>
