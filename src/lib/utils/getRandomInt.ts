type GetRandomInt = (prop: { min?: number; max: number; excepts?: number[] }) => number;

const getRandomInt: GetRandomInt = ({ min, max, excepts }) => {
	if (min === undefined) min = 0;
	if (!Number.isInteger(min) || !Number.isInteger(max))
		console.error('getRandomInt: arguments min and max should be integers.');

	if (max < min) console.error('getRandomInt: argument max should be greater than min.');

	if (excepts && !Array.isArray(excepts))
		console.error('getRandomInt: argument excepts should be an array.');
	if (excepts && Array.isArray(excepts)) {
		while (excepts.includes(min)) min++;
		while (excepts.includes(max)) max--;
		if (max < min)
			console.error(
				'getRandomInt: range [min, max] must have at least one integer not included in excepts.'
			);
	}

	let ret = Math.floor(Math.random() * (max - min + 1)) + min;
	while (excepts && Array.isArray(excepts) && excepts.includes(ret))
		ret = Math.floor(Math.random() * (max - min + 1)) + min;

	return ret;
};

export { getRandomInt };

// test
if (import.meta.vitest) {
	const { test, expect } = import.meta.vitest;
	test('getRandomInt', () => {
		const min = 1;
		const max = 10;
		const n = getRandomInt({ min, max });
		expect(n).toBeGreaterThanOrEqual(min);
		expect(n).toBeLessThanOrEqual(max);
	});
	test('getRandomInt with excepts', () => {
		const min = 1;
		const max = 10;
		const excepts = [1, 2, 3, 8, 10];
		const n = getRandomInt({ min, max, excepts });
		expect(n).toBeGreaterThanOrEqual(4);
		expect(n).toBeLessThanOrEqual(9);
		expect(excepts.includes(n)).toBe(false);
	});
}
