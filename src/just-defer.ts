/*!
 * Just Defer <https://github.com/smujmaiku/just-defer>
 * Copyright(c) 2020 Michael Szmadzinski
 * MIT Licensed
 */

type JustDeferResolve = (value?: unknown) => void;
type JustDeferReject = (reason: Error) => void;
type JustDeferCallback = (error?: Error, result?: unknown) => void;

interface JustDefer {
	resolve: JustDeferResolve;
	reject: JustDeferReject;
	callback: JustDeferCallback
	promise: Promise<unknown>;
}

export default function justDefer(): JustDefer {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let resolve: JustDeferResolve = (value?: unknown) => { return; };
	// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
	let reject: JustDeferReject = (reason?: any) => { return; };

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
