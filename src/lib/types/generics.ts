/** same as `Required<Pick<T, K>>` */
export type RequiredPick<T, K extends keyof T> = { [P in K]-?: T[P] };

/** same as `Partial<Omit<T, K>>` */
export type PartialOmit<T, K extends number | string | symbol> = {
	[P in Exclude<keyof T, K>]?: T[P];
};

/** `K` (default: `keyof T`) is the range that required at least one */
export type RequiredAtLeastOne<T, K extends keyof T = keyof T> = K extends keyof T
	? RequiredPick<T, K> & PartialOmit<T, K>
	: never;

/** fixed length array */
import type { FixedLengthArray as ConstArray } from 'type-fest';
export type { ConstArray };

/** fixed _max_ length array */
export type MaxLengthArray<T, N extends number> = N extends 0
	? []
	: N extends 3
		? [] | [T] | [T, T] | [T, T, T]
		: N extends 4
			? MaxLengthArray<T, 3> | [T, T, T, T]
			: N extends 5
				? MaxLengthArray<T, 4> | [T, T, T, T, T]
				: N extends 6
					? MaxLengthArray<T, 5> | [T, T, T, T, T, T]
					: N extends 7
						? MaxLengthArray<T, 6> | [T, T, T, T, T, T, T]
						: N extends 8
							? MaxLengthArray<T, 7> | [T, T, T, T, T, T, T, T]
							: N extends 9
								? MaxLengthArray<T, 8> | [T, T, T, T, T, T, T, T, T]
								: never;
