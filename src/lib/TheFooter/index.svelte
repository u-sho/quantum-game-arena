<script lang="ts">
import LogoWhite from '$lib/assets/logo_white.svg.svelte';
import TwitterLogoWhite from '$lib/assets/twitter-logo_white.svg.svelte';
export let h: number;
</script>

<footer class="footer" bind:clientHeight={h}>
	<div class="footer__logo">
		<a href="/#top">
			<LogoWhite styles="height: 100%; max-height: 112px;" />
			<h1 class="footer__title">Quantum Game Arena</h1>
		</a>
	</div>
	<a href="https://twitter.com/QGameArena" class="twitter-button">
		<TwitterLogoWhite styles="width: 1.25rem" />
		<span>@QGameArena</span>
	</a>
</footer>

<style lang="scss">
.footer {
	position: absolute;
	bottom: 0;
	width: 100%;
	box-sizing: border-box;
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
	margin: 0;
	padding: 0 0 0.2rem;
	display: inline-flex;
	border-bottom: 1px solid var(--bg-color);
	a {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--bg-color);
	}
}

.footer__title {
	margin: 0 0 0 16px;
	padding: 0;
	font-weight: bold;

	@media (max-width: 480px) {
		line-height: 1.2;
		font-size: 1.75rem;
	}
}

a.twitter-button {
	color: #ffffff;
	font-size: 1.25rem;
	height: 1.5rem;
	padding: 0.2rem 0;
	display: block;
}
</style>
