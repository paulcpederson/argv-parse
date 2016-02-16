# argv-parse

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/argv-parse.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/argv-parse
[travis-image]: https://img.shields.io/travis/paulcpederson/argv-parse.svg?style=flat-square
[travis-url]: https://travis-ci.org/paulcpederson/argv-parse
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

Parse command line arguments. This is a lot like [yargs](https://www.npmjs.com/package/yargs) or [optimist]()but not as feature rich.

## Install

```
npm install argv-parse
```

## Usage

Say you had a file like `foo-bar-baz.js` which needed to parse arguments:

```js
var argv = require('argv-parse')

// accepts a definition object and args
// if args is undefined, defaults to process.argv.slice(2)
var args = argv({
  foo: {
    type: 'boolean',
    alias: 'f'
  },
  bar: {
    type: 'array',
    alias: 'b'
  },
  baz: {
    type: 'string',
    alias: 'b'
  }
})
console.dir(args)
```

```
$ node foo-bar-baz.js --foo
{
  foo: true
}

$ node foo-bar-baz.js -f --baz hey
{
  foo: true,
  baz: 'hey'
}

$ node foo-bar-baz.js -f -b hey --bar thing1 thing2 thing3
{
  foo: true,
  baz: 'hey',
  bar: ['thing1', 'thing2', 'thing3']
}

$ node foo-bar-baz.js not specificed
{
  _: ['not', 'specified']
}
```

## License

[ISC](LICENSE)
