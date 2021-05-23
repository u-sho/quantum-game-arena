<header>
	<hgroup class="logo">
		<a sveltekit:prefetch href="/">
			<img src="logo-144x144.png" alt="QuantumGameArena" />
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
	header {
		display: flex;
		justify-content: space-between;
		height: 3rem;
		background-color: var(--theme-light-color);
	}

	.logo {
		height: 3rem;
		a {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;

			img {
				height: 2.5rem;
				width: 2.5rem;
			}
			h1 {
				font-size: 1.5rem;
				font-weight: bold;
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
			height: 3rem;
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
