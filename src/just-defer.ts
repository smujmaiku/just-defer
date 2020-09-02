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

export default function justDefer(): JustDefer {
	let resolve: JustDeferResolve = (value?) => { console.trace(INIT_ERROR_MSG, value); };
	let reject: JustDeferReject = (reason?) => { console.trace(INIT_ERROR_MSG, reason); };

	const promise: Promise<unknown> = new Promise((resolve_, reject_) => {
		resolve = resolve_;
		reject = reject_;
	});

	const callback: JustDeferCallback = (reason?, value?) => {
		if (reason) return reject(reason);
		resolve(value);
	};

	return {
		resolve,
		reject,
		callback,
		promise,
	};
}
