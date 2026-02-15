<script lang="ts">
import { resolve } from '$app/paths';
import TitleLogo from '$lib/assets/logo-title_row-colored.svg.svelte';
import IconSun from '$lib/assets/icon-sun.svg.svelte';
import IconMoon from '$lib/assets/icon-moon.svg.svelte';
import IconAuto from '$lib/assets/icon-auto.svg.svelte';
import { themeStore } from '$lib/stores/theme.svelte';

$effect(() => {
	const root = document.documentElement;
	if (themeStore.theme === 'light') {
		root.setAttribute('data-theme', 'light');
	} else if (themeStore.theme === 'dark') {
		root.setAttribute('data-theme', 'dark');
	} else {
		root.removeAttribute('data-theme');
	}
});

function _handleThemeToggle(): void {
	themeStore.toggleTheme();
}
</script>

<header>
	<hgroup>
		<a href={resolve('/')}>
			<TitleLogo style="height: 44px; margin: 6px 12px;" />
			<h1>Quantum Game Arena</h1>
		</a>
	</hgroup>

	<nav>
		<ul>
			<!-- <li><a href="/#about">About</a></li> -->
			<li><a href={resolve('/games/quantum-tictactoe')}>Game</a></li>
			<li>
				<button
					type="button"
					class="theme-toggle"
					onclick={_handleThemeToggle}
					aria-label="テーマを切り替え"
				>
					{#if themeStore.theme === 'light'}
						<IconSun style="width: 20px; height: 20px;" />
					{:else if themeStore.theme === 'dark'}
						<IconMoon style="width: 20px; height: 20px;" />
					{:else}
						<IconAuto style="width: 20px; height: 20px;" />
					{/if}
				</button>
			</li>
		</ul>
	</nav>
</header>

<style>
header {
	position: fixed;
	top: 0;
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 56px;
	background-color: var(--bg-light-color);
	border-top: 4px solid var(--theme-color);
	border-bottom: 4px solid var(--theme-color);
	z-index: 100;

	& hgroup {
		box-sizing: border-box;
		& a {
			box-sizing: border-box;
			& h1 {
				height: 0;
				width: 0;
				overflow: hidden;
				margin: 0;
			}
		}
	}
}

nav {
	display: flex;
	justify-content: center;

	& ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 54px;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background-size: contain;

		& li {
			position: relative;
			height: 100%;
			&::before {
				--size: 6px;
				content: '';
				width: 0;
				height: 0;
				position: absolute;
				top: 0;
				left: calc(50% - var(--size));
				border: var(--size) solid transparent;
				border-top: var(--size) solid var(--accent-color);
			}

			& a {
				display: flex;
				height: 100%;
				align-items: center;
				padding: 0 1em;
				color: var(--theme-color);
				font-weight: bold;
				font-size: 16px;
				text-transform: uppercase;
				letter-spacing: 10%;
				text-decoration: none;
				transition: color 0.2s linear;
				&:hover {
					opacity: 0.5;
				}
			}

			& .theme-toggle {
				display: flex;
				height: 100%;
				align-items: center;
				padding: 0 1em;
				background: none;
				border: none;
				color: var(--theme-color);
				cursor: pointer;
				transition: opacity 0.2s linear;
				&:hover {
					opacity: 0.5;
				}
			}
		}
	}
}
</style>
