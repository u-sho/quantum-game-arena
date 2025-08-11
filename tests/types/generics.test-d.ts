import { assertType, expectTypeOf, describe, test } from 'vitest';
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
		// @ts-expect-error `{}` has no property.
		assertType<Options>({});
		assertType<Options>({ foo: 3 });
		assertType<Options>({ bar: 3 });
		assertType<Options>({ baz: 's' });
		assertType<Options>({ bar: 5, baz: 'foo' });
		assertType<Options>({ foo: 5, baz: 'foo' });
		assertType<Options>({ foo: 5, bar: 2 });
		assertType<Options>({ foo: 123, bar: 123, baz: 'foo' });
	});

	test('is assignable other types?', () => {
		expectTypeOf({ foo: 'str' }).not.toMatchObjectType<Options>();
		expectTypeOf({ bar: 'str' }).not.toMatchObjectType<Options>();
		expectTypeOf({ bar: 5, baz: 5 }).not.toMatchObjectType<Options>();
		expectTypeOf({ bar: 'str', baz: 'str' }).not.toMatchObjectType<Options>();
		expectTypeOf({ foo: 5, baz: 5 }).not.toMatchObjectType<Options>();
		expectTypeOf({ foo: 'str', baz: 'str' }).not.toMatchObjectType<Options>();
		expectTypeOf({ foo: 5, bar: 'str' }).not.toMatchObjectType<Options>();
		expectTypeOf({ foo: 'str', bar: 3 }).not.toMatchObjectType<Options>();
		expectTypeOf<Options>().not.toHaveProperty('who');
	});
});

describe('RequiredAtLeastOne<T, K>', () => {
	// One of 'foo', 'bar' is required at least.
	type NumOptions = RequiredAtLeastOne<BaseOptions, 'foo' | 'bar'>;

	test('is required at least one of "foo"|"bar" ?', () => {
		// @ts-expect-error `{}` has no property.
		assertType<NumOptions>({});
		assertType<NumOptions>({ foo: 3 });
		assertType<NumOptions>({ bar: 3 });
		// @ts-expect-error one of `foo` or `bar` is required.
		assertType<NumOptions>({ baz: 's' });
		assertType<NumOptions>({ bar: 5, baz: 'foo' });
		assertType<NumOptions>({ foo: 5, baz: 'foo' });
		assertType<NumOptions>({ foo: 5, bar: 2 });
		assertType<NumOptions>({ foo: 123, bar: 123, baz: 'foo' });
	});

	test('is assignable other types?', () => {
		expectTypeOf({ foo: 'str' }).not.toMatchObjectType<NumOptions>();
		expectTypeOf({ bar: 'str' }).not.toMatchObjectType<NumOptions>();
		expectTypeOf({ bar: 5, baz: 5 }).not.toMatchObjectType<NumOptions>();
		expectTypeOf({ bar: 'str', baz: 'str' }).not.toMatchObjectType<NumOptions>();
		expectTypeOf({ foo: 5, baz: 5 }).not.toMatchObjectType<NumOptions>();
		expectTypeOf({ foo: 'str', baz: 'str' }).not.toMatchObjectType<NumOptions>();
		expectTypeOf({ foo: 5, bar: 'str' }).not.toMatchObjectType<NumOptions>();
		expectTypeOf({ foo: 'str', bar: 3 }).not.toMatchObjectType<NumOptions>();
		expectTypeOf<NumOptions>().not.toHaveProperty('who');
	});
});
