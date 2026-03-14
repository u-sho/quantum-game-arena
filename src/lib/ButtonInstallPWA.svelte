<script lang="ts">
import { onMount } from 'svelte';

type BeforeInstallPromptEvent = Event & {
	readonly platforms: readonly string[];
	readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
	prompt: () => Promise<void>;
};

let installPrompt: BeforeInstallPromptEvent | null = $state(null);
let isInstalled = $state(false);

onMount(() => {
	const handleBeforeInstallPrompt = (event: Event): void => {
		event.preventDefault();
		installPrompt = event as BeforeInstallPromptEvent;
	};

	const handleAppInstalled = (): void => {
		installPrompt = null;
		isInstalled = true;
	};

	window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
	window.addEventListener('appinstalled', handleAppInstalled);

	return (): void => {
		window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
		window.removeEventListener('appinstalled', handleAppInstalled);
	};
});

async function _install(): Promise<void> {
	if (!installPrompt) return;
	const promptEvent = installPrompt;
	// Clear the stored event immediately to avoid reusing a single-use prompt
	installPrompt = null;
	await promptEvent.prompt();
	await promptEvent.userChoice;
}
</script>

{#if installPrompt && !isInstalled}
	<button class="install-button" onclick={_install} type="button" aria-label="アプリをインストール">
		<span>インストール</span>
	</button>
{/if}

<style>
.install-button {
	display: flex;
	align-items: center;
	height: 100%;
	padding: 0 1em;
	background: none;
	border: none;
	cursor: pointer;
	color: var(--theme-color);
	font-weight: bold;
	font-size: 16px;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	transition: color 0.2s linear;
	&:hover {
		opacity: 0.5;
	}
}
</style>
