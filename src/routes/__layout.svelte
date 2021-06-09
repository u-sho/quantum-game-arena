<slot />

<style lang="scss">
	:root {
		--theme-color: #7a9de3;
		--theme-light-color: #f0f7ff;
		--accent-color: #e45355;
		--bg-color: #ffffff;
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
