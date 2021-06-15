<slot />

<style lang="scss">
	:root {
		--theme-color: #1d2088;
		--theme-light-color: #f0f8ff;
		--accent-color: #e45355;
		--bg-color: #ffffff;

		--header-height: 64px;
		--contents-width: 712px;
	}

	:global(body) {
		margin: 0;
		padding: 0;
	}

	:global(#svelte) {
		min-height: 100vh;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		position: relative;
		top: 0;
	}

	:global(a) {
		text-decoration: none;
	}
</style>
