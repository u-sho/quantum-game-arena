<script lang="ts">
import { resolve } from '$app/paths';
import TitleLogo from '$lib/assets/logo-title_row-colored.svg.svelte';
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
	background-color: #f0f7fff0;
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
		}
	}
}
</style>
