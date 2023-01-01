type OrdinalNumeral =
	| '0th'
	| 'first'
	| 'second'
	| 'third'
	| 'fourth'
	| 'fifth'
	| 'sixth'
	| 'seventh'
	| 'eighth'
	| 'ninth'
	| '11th'
	| '12th'
	| '13th'
	| `${Exclude<number, 1 | 0>}1st`
	| `${Exclude<number, 1 | 0>}2nd`
	| `${Exclude<number, 1 | 0>}3rd`
	| `${Exclude<number, 0>}${4 | 5 | 6 | 7 | 8 | 9 | 0}th`;

function getOrdinal(n: number): OrdinalNumeral {
	if (!Number.isInteger(n)) console.error('getOrdinal: argument n should be an integer.');
	if (n < 0 || 99 < n) console.error('getOrdinal: argument n should be between 0 and 99.');
	if (n === 1) return 'first';
	if (n === 2) return 'second';
	if (n === 3) return 'third';
	if (n === 4) return 'fourth';
	if (n === 5) return 'fifth';
	if (n === 6) return 'sixth';
	if (n === 7) return 'seventh';
	if (n === 8) return 'eighth';
	if (n === 9) return 'ninth';
	if (n === 11 || n === 12 || n === 13) return `${n}th`;
	if (n % 10 === 1) return `${n}st` as `${Exclude<number, 1 | 0>}1st`;
	if (n % 10 === 2) return `${n}nd` as `${Exclude<number, 1 | 0>}2nd`;
	if (n % 10 === 3) return `${n}rd` as `${Exclude<number, 1 | 0>}3rd`;
	return `${n}th` as `${Exclude<number, 0>}${4 | 5 | 6 | 7 | 8 | 9 | 0}th` | '0th';
}

export { getOrdinal };

// test
if (import.meta.vitest) {
	const { test, expect } = import.meta.vitest;
	test('getOrdinal', () => {
		expect(getOrdinal(0)).toBe('0th');
		expect(getOrdinal(1)).toBe('first');
		expect(getOrdinal(11)).toBe('11th');
		expect(getOrdinal(22)).toBe('22nd');
		expect(getOrdinal(33)).toBe('33rd');
	});
}
