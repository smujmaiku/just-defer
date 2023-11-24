/*!
 * Just Defer <https://github.com/smujmaiku/just-defer>
 * Copyright(c) 2021 Michael Szmadzinski
 * MIT Licensed
 */

type JustDeferResolve<T = unknown> = (value: T | PromiseLike<T>) => void;
type JustDeferReject = (reason: Error) => void;
type JustDeferCallback<T = unknown> = (reason?: Error, result?: T) => void;

interface JustDefer<T = unknown> {
	resolve: JustDeferResolve<T>;
	reject: JustDeferReject;
	callback: JustDeferCallback<T>;
	promise: Promise<T>;
}

function justDefer<T = unknown>(): JustDefer<T> {
	const defer: JustDefer<T> = {
		resolve: null!,
		reject: null!,
		callback: null!,
		promise: null!,
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

declare namespace justDefer {
	export { JustDeferResolve, JustDeferReject, JustDeferCallback, JustDefer };
}
