<script lang="ts">
import { onMount } from 'svelte';
import IconSun from '$lib/assets/icon-sun.svg.svelte';
import IconMoon from '$lib/assets/icon-moon.svg.svelte';
import IconAuto from '$lib/assets/icon-auto.svg.svelte';

type Theme = 'light' | 'dark' | 'auto';

let theme = $state<Theme>('auto');
let buttonLabel = $state('ダークテーマに切り替え');

onMount(() => {
	try {
		const savedTheme = localStorage.getItem('theme');
		const rootElement = document.documentElement;
		if (savedTheme === 'dark') {
			theme = 'dark';
			buttonLabel = 'ライトテーマに切り替え';
			rootElement.setAttribute('data-theme', 'dark');
		} else if (savedTheme === 'light') {
			theme = 'light';
			buttonLabel = 'ブラウザのテーマに切り替え';
			rootElement.setAttribute('data-theme', 'light');
		} else if (savedTheme === 'auto') {
			theme = 'auto';
			buttonLabel = 'ダークテーマに切り替え';
			localStorage.setItem('theme', 'auto');
			rootElement.removeAttribute('data-theme');
		} else {
			theme = 'auto';
			buttonLabel = 'ダークテーマに切り替え';
			localStorage.setItem('theme', 'auto');
			rootElement.removeAttribute('data-theme');
		}
	} catch (error) {
		console.error('テーマの読み込みに失敗しました:', error);
		theme = 'auto';
		buttonLabel = 'ダークテーマに切り替え';
		document.documentElement.removeAttribute('data-theme');
		localStorage.setItem('theme', 'auto');
	}
});

const toggleTheme = (): void => {
	const rootElement = document.documentElement;
	if (theme === 'auto') {
		theme = 'dark';
		buttonLabel = 'ライトテーマに切り替え';
		rootElement.setAttribute('data-theme', 'dark');
	} else if (theme === 'dark') {
		theme = 'light';
		buttonLabel = 'ブラウザのテーマに切り替え';
		rootElement.setAttribute('data-theme', 'light');
	} else {
		theme = 'auto';
		buttonLabel = 'ダークテーマに切り替え';
		rootElement.removeAttribute('data-theme');
	}
	localStorage.setItem('theme', theme);
};
</script>

<button
	type="button"
	class="theme-toggle"
	onclick={toggleTheme}
	aria-label={buttonLabel}
	title={buttonLabel}
>
	{#if theme === 'auto'}
		<IconMoon style="width: 20px; height: 20px;" />
	{:else if theme === 'dark'}
		<IconSun style="width: 20px; height: 20px;" />
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
		opacity: 0.7;
	}
}
</style>
