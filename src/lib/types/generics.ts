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
export type ConstArray<T, N extends number> = N extends 0
	? []
	: N extends 3
	? [T, T, T]
	: N extends 6
	? [T, T, T, T, T, T]
	: N extends 7
	? [T, T, T, T, T, T, T]
	: N extends 8
	? [T, T, T, T, T, T, T, T]
	: N extends 9
	? [T, ...ConstArray<T, 8>]
	: never;

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
	? MaxLengthArray<T, 5> | ConstArray<T, 6>
	: N extends 7
	? MaxLengthArray<T, 6> | ConstArray<T, 7>
	: N extends 8
	? MaxLengthArray<T, 7> | ConstArray<T, 8>
	: N extends 9
	? MaxLengthArray<T, 8> | ConstArray<T, 9>
	: never;
