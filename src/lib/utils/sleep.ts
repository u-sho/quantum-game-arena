const sleep = async (ms: number): Promise<void> =>
	new Promise((resolve) => setTimeout(resolve, ms));

export { sleep };

// test
if (import.meta.vitest) {
	const { test, expect } = import.meta.vitest;

	test('sleep', async () => {
		const sleepTime = 100; // ms
		const tolerance = sleepTime * 0.005;

		const start = performance.now();
		await sleep(sleepTime);
		const end = performance.now();

		expect(end - start).toBeGreaterThanOrEqual(sleepTime - tolerance);
	});
}
