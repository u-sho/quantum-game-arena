<script lang="ts">
import { onMount, type Snippet } from 'svelte';

const { children }: { children: Snippet } = $props();

let dialogElement: HTMLDialogElement;
onMount(() => {
	dialogElement.showModal();
	setTimeout(() => {
		dialogElement.close();
	}, 2400);
});
</script>

<dialog class="modal" bind:this={dialogElement} open={false}>
	{@render children()}
</dialog>

<style>
.modal {
	padding: 0;
	border: 0;
	border-radius: 0;
	box-shadow: 0 0 1rem black;
	background-color: transparent;
	pointer-events: none;

	&::backdrop {
		background-color: rgba(0, 0, 10, 0.3);
	}

	&[open] {
		transition: cubic-bezier(0, 0, 1, 1);
		animation: slide-in 2.5s;
	}

	&:not([open]) {
		opacity: 0;
	}
}

@keyframes slide-in {
	0% {
		opacity: 0;
		transform: translateX(100vw);
	}
	40% {
		opacity: 1;
		transform: translate(0, 0);
	}
	60% {
		opacity: 1;
		transform: translate(0, 0);
	}
	100% {
		opacity: 0;
		transform: translateX(-100vw);
	}
}
</style>
