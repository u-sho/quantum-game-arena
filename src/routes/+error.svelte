<script lang="ts">
import { page } from '$app/stores';
</script>

<svelte:head>
	<link rel="canonical" href="https://qgame.app" />
	<title>Quantum Game Arena</title>
	<meta property="og:url" content="https://qgame.app" />
	<meta property="og:title" content="Quantum Game Arena" />
</svelte:head>

<main style="padding: var(--header-height) 1rem 0;">
	<h1>{$page.status}: {$page.error?.message}</h1>
</main>
