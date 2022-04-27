import type * as SvelteEasing from 'svelte/easing';
import type * as SvelteInternal from 'svelte/internal';

declare module 'svelte-scrollto' {
	type ScrollToOption = Readonly<
		Partial<{
			container: string /** html tag */;
			duration: number /** milliseconds */;
			delay: number /** milliseconds */;
			offset: number /** pixels */;
			easing: SvelteEasing;
			onStart: SvelteInternal;
			onDone: SvelteInternal;
			onAborting: SvelteInternal;
			scrollX: boolean;
			scrollY: boolean;
		}>
	>;
	declare function scrollTo(option: ScrollToOption): void;
}
