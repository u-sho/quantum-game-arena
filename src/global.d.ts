declare namespace App {
	// interface Error {}
	// interface Locals {}
	// interface PageData {}
	// interface Platform {}
}

declare module 'svelte-scrollto' {
	type ScrollToOption = Readonly<
		Partial<{
			element: string /** target selector */;
			container?: string /** scroll container, `"body"` is default */;
			duration?: number /** milliseconds, `500` is default */;
			delay?: number /** milliseconds, `0` is default */;
			offset?: number /** pixels, `0` is default */;
			easing?: (t: number) => number /** `svelte/easing` function, `cubicInOut` is default */;
			onStart?: (target: HTMLElement, offset: number) => void /** callback function */;
			onDone?: (target: HTMLElement, offset: number) => void /** callback function */;
			onAborting?: (target: HTMLElement, offset: number) => void /** callback function */;
			scrollX?: boolean /** `false` is default */;
			scrollY?: boolean /** `true` is default */;
		}>
	>;
	declare function scrollTo(option: ScrollToOption): void;
}
