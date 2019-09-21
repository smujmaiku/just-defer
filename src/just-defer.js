/*!
 * Just Defer <https://github.com/smujmaiku/just-defer>
 * Copyright(c) 2019 Michael Szmadzinski
 * MIT Licensed
 */

/**
 * Creates a defer for async usage
 * @returns {Object} {promise, resolve, reject, callback}
 */
function justDefer() {
	const defer = {};
	defer.promise = new Promise((resolve, reject) => {
		defer.resolve = resolve;
		defer.reject = reject;
	});
	defer.callback = (err, res) => {
		if (err) return defer.reject(err);
		defer.resolve(res);
	};
	return defer;
}

exports = module.exports = justDefer;
