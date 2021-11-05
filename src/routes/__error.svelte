<script context="module" lang="ts">
	import type { ErrorLoadInput, ErrorLoad } from '@sveltejs/kit/types/page';
	export function load({ error, status }: ErrorLoadInput): ReturnType<ErrorLoad> {
		return { props: { title: `${status}: ${error?.message}` } };
	}
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
