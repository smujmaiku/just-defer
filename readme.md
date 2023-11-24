# Just Defer

Do you have a lot of callbacks but you like Promises more?
Have you written the same one function into many projects?
Would you like to use `Async` more?

Just defer your callbacks!

## Installation

`npm i just-defer`

## Usage

### Resolve and Reject

```js
const justDefer = require('just-defer');
const { promise, resolve, reject } = justDefer();

fs.readFile('/etc/passwd', (err, res) => {
    if(err) return reject(err);
    resolve(res);
});
const passwd = await promise;

console.log('passwd contents', passwd);
```

### Callback

```js
const justDefer = require('just-defer');
const { promise, callback } = justDefer();

fs.readFile('/etc/passwd', callback);
const passwd = await promise;

console.log('passwd contents', passwd);
```

## License

Copyright (c) 2021, Michael Szmadzinski. (MIT License)
