<script lang="ts">
import LogoWhite from '$lib/assets/logo_white.svg.svelte';
import TwitterLogoWhite from '$lib/assets/twitter-logo_white.svg.svelte';
import GithubMarkWhite from '$lib/assets/github-mark-white.svg.svelte';
export let h: number;
</script>

<footer class="footer" bind:clientHeight={h}>
	<div class="footer__logo">
		<a href="/#top">
			<LogoWhite styles="height: 100%; max-height: 112px;" />
			<h1 class="footer__title">Quantum Game Arena</h1>
		</a>
	</div>
	<div class="footer__links">
		<a
			href="https://twitter.com/QGameArena"
			class="twitter-button"
			aria-label="Twitter (X) account"
		>
			<TwitterLogoWhite styles="width: 1.25rem" />
		</a>
		<a
			href="https://github.com/u-sho/quantum-game-arena"
			class="github-button"
			aria-label="GitHub repository"
		>
			<GithubMarkWhite styles="width: 1.25rem; height: 1.25rem" />
		</a>
	</div>
	<p class="copyright">
		&copy; 2021-{new Date().getFullYear()}
		<a rel="author" href="https://github.com/u-sho">Shouhei Uechi</a> & Takuma Nishimura.
	</p>
</footer>

<style>
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
	& a {
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

.footer__links {
	margin: 0;
	padding: 0.2rem;
	display: inline-flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	& a {
		margin: 0 0.5rem;
	}
}

a.twitter-button,
a.github-button {
	color: #ffffff;
	font-size: 1.25rem;
	height: 1.5rem;
	padding: 0.2rem 0;
	display: block;
}

p.copyright {
	margin: 0;
	padding: 0;
	font-size: 0.75rem;
	line-height: 1.5;
	text-align: center;
}
a[rel='author'] {
	color: #ffffff;
}
</style>
