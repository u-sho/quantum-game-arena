<script lang="ts">
import { page } from '$app/stores';
</script>

<svelte:head>
	<link rel="canonical" href="https://qgame.app" />
	<link rel="manifest" href="https://qgame.app/manifest.webmanifest" />
	<title>Quantum Game Arena</title>
	<meta property="og:url" content="https://qgame.app" />
	<meta property="og:title" content="Quantum Game Arena" />
</svelte:head>

<h1>{$page.status}: {$page.error?.message}</h1>
