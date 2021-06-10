import type { RequiredAtLeastOne } from '$lib/types/generics';

type BaseOptions = {
	foo: number;
	bar: number;
	baz: string;
};

describe('RequiredAtLeastOne<T>', () => {
	// One of 'foo', 'bar', 'baz' is required at least.
	type Options = RequiredAtLeastOne<BaseOptions>;

	test('is required at least one?', () => {
		// @ts-expect-error
		const opt0: Options = {};
		const opt11: Options = { foo: 3 };
		const opt12: Options = { bar: 3 };
		const opt13: Options = { baz: 's' };
		const opt21: Options = { bar: 5, baz: 'foo' };
		const opt22: Options = { foo: 5, baz: 'foo' };
		const opt23: Options = { foo: 5, bar: 2 };
		const opt3: Options = { foo: 123, bar: 123, baz: 'foo' };
	});

	test('is assignable other types?', () => {
		// @ts-expect-error
		let opt: Options = { foo: 'str' };
		// @ts-expect-error
		opt = { bar: 'str' };
		// @ts-expect-error
		opt = { bar: 5, baz: 5 };
		// @ts-expect-error
		opt = { bar: 'str', baz: 'str' };
		// @ts-expect-error
		opt = { foo: 5, baz: 5 };
		// @ts-expect-error
		opt = { foo: 'str', baz: 'str' };
		// @ts-expect-error
		opt = { foo: 5, bar: 'str' };
		// @ts-expect-error
		opt = { foo: 'str', bar: 3 };
		// @ts-expect-error
		opt = { foo: 1, bar: 1, baz: 'ff', who: 4 };
	});
});

describe('RequiredAtLeastOne<T, K>', () => {
	// One of 'foo', 'bar' is required at least.
	type NumOptions = RequiredAtLeastOne<BaseOptions, 'foo' | 'bar'>;

	test('is required at least one of "foo"|"bar" ?', () => {
		// @ts-expect-error
		const npt0: NumOptions = {};
		const npt11: NumOptions = { foo: 3 };
		const npt12: NumOptions = { bar: 3 };
		// @ts-expect-error
		const npt13: NumOptions = { baz: 's' };
		const npt21: NumOptions = { bar: 5, baz: 'foo' };
		const npt22: NumOptions = { foo: 5, baz: 'foo' };
		const npt23: NumOptions = { foo: 5, bar: 2 };
		const npt3: NumOptions = { foo: 123, bar: 123, baz: 'foo' };
	});

	test('is assignable other types?', () => {
		// @ts-expect-error
		let npt: NumOptions = { foo: 'str' };
		// @ts-expect-error
		npt = { bar: 'str' };
		// @ts-expect-error
		npt = { bar: 5, baz: 5 };
		// @ts-expect-error
		npt = { bar: 'str', baz: 'str' };
		// @ts-expect-error
		npt = { foo: 5, baz: 5 };
		// @ts-expect-error
		npt = { foo: 'str', baz: 'str' };
		// @ts-expect-error
		npt = { foo: 5, bar: 'str' };
		// @ts-expect-error
		npt = { foo: 'str', bar: 3 };
		// @ts-expect-error
		npt = { foo: 1, bar: 1, baz: 'ff', who: 4 };
	});
});
