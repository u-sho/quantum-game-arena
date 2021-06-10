<script context="module" lang="ts">
	import type { ErrorLoadInput, ErrorLoad } from '@sveltejs/kit/types/page';
	export function load({ error, status }: ErrorLoadInput): ReturnType<ErrorLoad> {
		return { props: { title: `${status}: ${error.message}` } };
	}
</script>

<script lang="ts">
	export let title: string;
</script>

<h1>{title}</h1>
