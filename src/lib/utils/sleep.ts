const sleep = async (ms: number): Promise<void> =>
	new Promise((resolve) => setTimeout(resolve, ms));

export { sleep };

// test
if (import.meta.vitest) {
	const { test, expect } = import.meta.vitest;
	test('sleep', async () => {
		const sleepTime = 100;
		const start = Date.now();
		await sleep(sleepTime);
		const end = Date.now();
		expect(end - start).toBeGreaterThanOrEqual(sleepTime);
	});
}
