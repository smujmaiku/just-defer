import justDefer from './just-defer';

describe('just-defer', () => {
	it('should resolve', async () => {
		const { promise, resolve } = justDefer();
		const data = { some: 'data' };
		setTimeout(() => resolve(data), 1);
		expect(await promise).toBe(data);
	});

	it('should reject', async () => {
		const { promise, reject } = justDefer();
		const errmsg = 'some error';
		setTimeout(() => reject(new Error(errmsg)), 1);
		try {
			await promise;
			throw new Error('it didnt reject');
		} catch (err) {
			expect(err.message).toBe(errmsg);
		}
	});

	describe('callback', () => {
		it('should resolve', async () => {
			const { promise, callback } = justDefer();
			const data = { some: 'data' };
			setTimeout(() => callback(undefined, data), 1);
			expect(await promise).toBe(data);
		});

		it('should reject', async () => {
			const { promise, callback } = justDefer();
			const errmsg = 'some error';
			setTimeout(() => callback(new Error(errmsg)), 1);
			try {
				await promise;
				throw new Error('it didnt reject');
			} catch (err) {
				expect(err.message).toBe(errmsg);
			}
		});
	});
});
