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
		let opt: Options = {};
		opt = { foo: 3 };
		opt = { bar: 3 };
		opt = { baz: 's' };
		opt = { bar: 5, baz: 'foo' };
		opt = { foo: 5, baz: 'foo' };
		opt = { foo: 5, bar: 2 };
		opt = { foo: 123, bar: 123, baz: 'foo' };
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
		let numOpt: NumOptions = {};
		numOpt = { foo: 3 };
		numOpt = { bar: 3 };
		// @ts-expect-error
		numOpt = { baz: 's' };
		numOpt = { bar: 5, baz: 'foo' };
		numOpt = { foo: 5, baz: 'foo' };
		numOpt = { foo: 5, bar: 2 };
		numOpt = { foo: 123, bar: 123, baz: 'foo' };
	});

	test('is assignable other types?', () => {
		// @ts-expect-error
		let numOpt: NumOptions = { foo: 'str' };
		// @ts-expect-error
		numOpt = { bar: 'str' };
		// @ts-expect-error
		numOpt = { bar: 5, baz: 5 };
		// @ts-expect-error
		numOpt = { bar: 'str', baz: 'str' };
		// @ts-expect-error
		numOpt = { foo: 5, baz: 5 };
		// @ts-expect-error
		numOpt = { foo: 'str', baz: 'str' };
		// @ts-expect-error
		numOpt = { foo: 5, bar: 'str' };
		// @ts-expect-error
		numOpt = { foo: 'str', bar: 3 };
		// @ts-expect-error
		numOpt = { foo: 1, bar: 1, baz: 'ff', who: 4 };
	});
});
