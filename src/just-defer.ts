/*!
 * Just Defer <https://github.com/smujmaiku/just-defer>
 * Copyright(c) 2020 Michael Szmadzinski
 * MIT Licensed
 */

type JustDeferResolve = (value?: unknown) => void;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JustDeferReject = (reason: any) => void;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JustDeferCallback = (reason?: any, result?: unknown) => void;

const INIT_ERROR_MSG = 'JustdDefer callbacks failed to register';

interface JustDefer {
	resolve: JustDeferResolve;
	reject: JustDeferReject;
	callback: JustDeferCallback
	promise: Promise<unknown>;
}

module.exports = function justDefer(): JustDefer {
	const defer: JustDefer = {
		// Unreachable functions to init interface
		resolve: (value?) => { console.trace(INIT_ERROR_MSG, value); },
		reject: (reason?) => { console.trace(INIT_ERROR_MSG, reason); },
		callback: (reason?, value?) => { console.trace(INIT_ERROR_MSG, reason, value); },
		promise: new Promise((resolve) => { resolve(); }),
	};

	defer.promise = new Promise((resolve, reject) => {
		defer.resolve = resolve;
		defer.reject = reject;
	});

	defer.callback = (reason?, value?) => {
		if (reason) return defer.reject(reason);
		defer.resolve(value);
	};

	return defer;
}
