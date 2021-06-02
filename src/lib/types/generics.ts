// same as Required<Pick<T, K>>
type RequiredPick<T, K extends keyof T> = { [P in K]-?: T[P] };

// same as Partial<Omit<T, K>>
type PartialOmit<T, K extends number | string | symbol> = {
	[P in Exclude<keyof T, K>]?: T[P];
};

// K is required, K\T is partial
type PartialRequired<T, K extends keyof T> = RequiredPick<T, K> & PartialOmit<T, K>;

// K? (default: keyof T) is the range that required at least one
type RequiredAtLeastOne<T, K extends keyof T = keyof T> = K extends keyof T
	? PartialRequired<T, K>
	: never;

export type { RequiredPick, PartialOmit, PartialRequired, RequiredAtLeastOne };
