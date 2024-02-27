<script lang="ts">
import AppHeader from '$lib/AppHeader.svelte';
import './global.css';

import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
inject({ mode: dev ? 'development' : 'production' });
injectSpeedInsights();
</script>

<AppHeader />
<slot />
