<slot />

<style lang="scss">
	:root {
		--theme-color: #1a5086;
		--theme-light-color: #7a9de3;
		--accent-color: #e45355;
		--bg-light-color: #f0f7ff;
		--bg-color: #ffffff;

		--header-height: 64px;
		--contents-width: 712px;
		--contents-width-text: 512px;
	}

	:global(body) {
		margin: 0;
		padding: 0;
	}

	:global(#svelte) {
		width: 100%;
		height: 100%;
		min-height: 100vh;
		box-sizing: border-box;
		position: relative;
		top: 0;
	}

	:global(a) {
		text-decoration: none;
	}
</style>
