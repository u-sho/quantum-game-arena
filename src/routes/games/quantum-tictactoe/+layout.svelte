<script lang="ts">
import { onMount, type Snippet } from 'svelte';

const { children }: { children: Snippet } = $props();

onMount(() => {
	const link = document.querySelector<HTMLLinkElement>('link[rel="manifest"]');
	const prevHref = link?.href ?? '/manifest.webmanifest';
	if (link) link.href = '/games/quantum-tictactoe/manifest.webmanifest';

	return (): void => {
		const l = document.querySelector<HTMLLinkElement>('link[rel="manifest"]');
		if (l) l.href = prevHref;
	};
});
</script>

{@render children()}
