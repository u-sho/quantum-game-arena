<script context="module" lang="ts">
	export const prerender = true;

	let dialogElement: HTMLDialogElement;
	export async function openModal(miliSec: number = 2000) {
		dialogElement.showModal();
		setTimeout(dialogElement.close, miliSec);
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	onMount(openModal);
</script>

<dialog class="modal" bind:this={dialogElement} open={false}>
	<div class="modal-body">
		<p>Finally, HTML has a native dialog box element! This is fantastic.</p>
		<p>And a polyfill makes this usable today.</p>
	</div>
</dialog>

<style lang="scss">
	.modal {
		padding: 0;
		border: 0;
		border-radius: 0;
		box-shadow: 0 0 1rem black;
		background-color: white;

		&::backdrop {
			background-color: rgba(0, 0, 10, 0.3);
		}

		&[open] {
			animation: slide-in 2s ease-in-out;
		}
	}

	.modal-body {
		padding: 0 1em;
	}

	@keyframes slide-in {
		0% {
			opacity: 0.5;
			transform: translateX(100vw);
		}
		50% {
			opacity: 1;
			transform: translate(0, 0);
		}
		100% {
			transform: translateX(-100vw);
		}
	}
</style>
