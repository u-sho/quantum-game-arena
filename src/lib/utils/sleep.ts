const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export { sleep };

// test
if (import.meta.vitest) {
	const { test, expect } = import.meta.vitest;
	test('sleep', async () => {
		const start = Date.now();
		await sleep(1000);
		const end = Date.now();
		expect(end - start).toBeGreaterThanOrEqual(1000);
	});
}
