<script lang="ts">
	import TitleLogo from '$lib/assets/logo-title_row-colored.svg.svelte';
</script>

<header class="header">
	<hgroup class="logo">
		<a sveltekit:prefetch href="/">
			<TitleLogo styles="height: 44px; margin: 6px 12px" />
			<h1>Quantum Game Arena</h1>
		</a>
	</hgroup>

	<nav>
		<ul>
			<li><a sveltekit:prefetch href="/#about">About</a></li>
			<li><a sveltekit:prefetch sveltekit:noscroll href="/#games">Games</a></li>
		</ul>
	</nav>
</header>

<style lang="scss">
	.header {
		position: fixed;
		top: 0;
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 56px;
		background-color: #fffffff0;
		border-top: 4px solid var(--accent-color);
		z-index: 100;
	}

	.logo {
		box-sizing: border-box;
		a {
			box-sizing: border-box;
			h1 {
				height: 0;
				width: 0;
				overflow: hidden;
				margin: 0;
			}
		}
	}

	nav {
		display: flex;
		justify-content: center;

		ul {
			position: relative;
			padding: 0;
			margin: 0;
			height: 54px;
			display: flex;
			justify-content: center;
			align-items: center;
			list-style: none;
			background-size: contain;

			li {
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

				a {
					display: flex;
					height: 100%;
					align-items: center;
					padding: 0 1em;
					color: var(--heading-color);
					font-weight: 700;
					font-size: 1rem;
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
