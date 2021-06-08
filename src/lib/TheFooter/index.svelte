<footer class="footer">
	<div class="footer__logo">
		<a sveltekit:prefetch href="/#top">
			<img src="/logo-144x144.png" alt="QuantumGameArena" />
			<h1 class="footer__title">Quantum Game Arena</h1>
		</a>
	</div>
	twitter
</footer>

<style lang="scss">
	.footer {
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
