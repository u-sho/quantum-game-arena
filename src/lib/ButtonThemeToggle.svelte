<script lang="ts">
import IconSun from '$lib/assets/icon-sun.svg.svelte';
import IconMoon from '$lib/assets/icon-moon.svg.svelte';
import IconAuto from '$lib/assets/icon-auto.svg.svelte';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark' | 'auto';

let theme = $state<Theme>('auto');

$effect(() => {
	if (browser) {
		const root = document.documentElement;
		if (theme === 'light') {
			root.setAttribute('data-theme', 'light');
		} else if (theme === 'dark') {
			root.setAttribute('data-theme', 'dark');
		} else {
			root.removeAttribute('data-theme');
		}
	}
});

function _toggleTheme(): void {
	if (theme === 'light') {
		theme = 'dark';
	} else if (theme === 'dark') {
		theme = 'auto';
	} else {
		theme = 'light';
	}
}
</script>

<button type="button" class="theme-toggle" onclick={_toggleTheme} aria-label="テーマを切り替え">
	{#if theme === 'light'}
		<IconSun style="width: 20px; height: 20px;" />
	{:else if theme === 'dark'}
		<IconMoon style="width: 20px; height: 20px;" />
	{:else}
		<IconAuto style="width: 20px; height: 20px;" />
	{/if}
</button>

<style>
.theme-toggle {
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
</style>
