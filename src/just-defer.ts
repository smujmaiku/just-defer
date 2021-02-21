/*!
 * Just Defer <https://github.com/smujmaiku/just-defer>
 * Copyright(c) 2021 Michael Szmadzinski
 * MIT Licensed
 */

type JustDeferResolve<T = unknown> = (value: T | PromiseLike<T>) => void;
type JustDeferReject = (reason: Error) => void;
type JustDeferCallback<T = unknown> = (reason?: Error, result?: T) => void;

const INIT_ERROR_MSG = 'JustdDefer callbacks failed to register';

interface JustDefer<T = unknown> {
	resolve: JustDeferResolve<T>;
	reject: JustDeferReject;
	callback: JustDeferCallback<T>;
	promise: Promise<T>;
}

function justDefer<T = unknown>(): JustDefer<T> {
	/* istanbul ignore next: imposible to enter */
	const defer: JustDefer<T> = {
		resolve: (value?) => { console.trace(INIT_ERROR_MSG, value); },
		reject: (reason?) => { console.trace(INIT_ERROR_MSG, reason); },
		callback: (reason?, value?) => { console.trace(INIT_ERROR_MSG, reason, value); },
		promise: new Promise(() => { return; }),
	};

	defer.promise = new Promise<T>((resolve, reject) => {
		defer.resolve = resolve;
		defer.reject = reject;
	});

	defer.callback = (reason?, value?) => {
		if (reason) return defer.reject(reason);
		defer.resolve(value as T);
	};

	return defer;
}

justDefer.justDefer = justDefer;
justDefer.default = justDefer;
export = justDefer;

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace justDefer {
	export {
		JustDeferResolve,
		JustDeferReject,
		JustDeferCallback,
		JustDefer,
	}
}
