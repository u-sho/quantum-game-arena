<script lang="ts">
import TheHeader from '$lib/TheHeader/index.svelte';
import '../global.css';
</script>

<TheHeader />
<slot />

<style lang="scss">
:root {
	--theme-color: #1a5086;
	--theme-color-rgb: 26, 80, 134;
	--theme-light-color: #7a9de3;
	--accent-color: #e45355;
	--bg-light-color: #f0f7ff;
	--bg-color: #ffffff;

	--header-height: 64px;
	--contents-width: 712px;
	--contents-width-text: 512px;
}
</style>
