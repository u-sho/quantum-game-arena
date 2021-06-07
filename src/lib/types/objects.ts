type ConstArray<T, N> = N extends 0
	? []
	: N extends 3
	? [T, T, T]
	: N extends 8
	? [T, T, T, T, T, T, T, T]
	: N extends 9
	? [T, ...ConstArray<T, 8>]
	: never;

export type { ConstArray };
