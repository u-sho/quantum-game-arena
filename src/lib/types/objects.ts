type ConstArray<T, N> = N extends 0
	? []
	: N extends 3
	? [T, T, T]
	: N extends 9
	? [T, T, T, T, T, T, T, T, T]
	: never;

export type { ConstArray };
