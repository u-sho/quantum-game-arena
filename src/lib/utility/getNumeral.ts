// refactor: template literal type return annotation
function getOrdinal(n: number): string {
	if (n === 1) return 'first';
	if (n === 2) return 'second';
	if (n === 3) return 'third';
	if (n === 4) return 'fourth';
	if (n === 5) return 'fifth';
	if (n === 6) return 'sixth';
	if (n === 7) return 'seventh';
	if (n === 8) return 'eighth';
	if (n === 9) return 'ninth';
	if (n % 10 === 1) return `${n}st`;
	if (n % 10 === 2) return `${n}nd`;
	if (n % 10 === 3) return `${n}rd`;
	return `${n}th`;
}

export { getOrdinal };
