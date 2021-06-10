type OrdinalNumeral =
	| 'first'
	| 'second'
	| 'third'
	| 'fourth'
	| 'fifth'
	| 'sixth'
	| 'seventh'
	| 'eighth'
	| 'ninth'
	| `${number}1st`
	| `${number}2nd`
	| `${number}3rd`
	| `${number}th`;

function getOrdinal(n: number): OrdinalNumeral {
	if (n === 1) return 'first';
	if (n === 2) return 'second';
	if (n === 3) return 'third';
	if (n === 4) return 'fourth';
	if (n === 5) return 'fifth';
	if (n === 6) return 'sixth';
	if (n === 7) return 'seventh';
	if (n === 8) return 'eighth';
	if (n === 9) return 'ninth';
	if (n % 10 === 1) return `${n}st` as `${number}1st`;
	if (n % 10 === 2) return `${n}nd` as `${number}2nd`;
	if (n % 10 === 3) return `${n}rd` as `${number}3rd`;
	return `${n}th` as `${number}th`;
}

export { getOrdinal };
