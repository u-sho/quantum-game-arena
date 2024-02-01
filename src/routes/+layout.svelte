<script lang="ts">
import AppHeader from '$lib/AppHeader.svelte';
import './global.css';

import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';
inject({ mode: dev ? 'development' : 'production' });
</script>

<AppHeader />
<slot />
