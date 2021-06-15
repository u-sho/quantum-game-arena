<script lang="ts">
	import Logo from '$lib/assets/logo_white.svg.svelte';
</script>

<footer class="footer">
	<div class="footer__logo">
		<a sveltekit:prefetch href="/#top">
			<Logo styles="height: 32px" />
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
		color: var(--bg-color);
		@media (min-width: 480px) {
			padding: 40px 0;
		}
	}

	.footer__logo {
		margin: 16px 0;
		a {
			display: flex;
			align-items: center;
			justify-content: center;
			color: var(--bg-color);
			border-bottom: 1px solid var(--bg-color);
		}
	}

	.footer__title {
		margin: 0 0 0 16px;
		padding: 0;
		font-weight: bold;
	}
</style>
