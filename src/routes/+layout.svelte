<script lang="ts">
import TheHeader from '$lib/TheHeader/index.svelte';
import './global.css';

import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';
inject({ mode: dev ? 'development' : 'production' });
</script>

<TheHeader />
<slot />
