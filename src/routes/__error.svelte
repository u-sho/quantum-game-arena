<script context="module" lang="ts">
import type { Load } from '@sveltejs/kit';
export const load: Load = ({ error, status }) => ({
	props: { title: `${status}: ${error?.message}` }
});
</script>

<script lang="ts">
export let title: string;
</script>

<svelte:head>
	<link rel="canonical" href="https://qgame.app/" />
	<title>Quantum Game Arena</title>
	<meta property="og:url" content="https://qgame.app/" />
	<meta property="og:title" content="Quantum Game Arena" />
</svelte:head>

<h1>{title}</h1>
