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

Parse command line arguments. This is a lot like [yargs](https://www.npmjs.com/package/yargs) or [optimist](https://www.npmjs.com/package/optimist) but not as feature rich.

You can specify flags, aliases, or not. Can pass arrays, strings, and booleans. No dependencies.

If you don't need array arguments, I'd recommend using [minimist](https://www.npmjs.com/package/minimist) which is very good.

## Install

```
npm install argv-parse
```

## Usage

Say you had a file like `foo-bar-qux.js` which needed to parse arguments:

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
    type: 'string',
    alias: 'b'
  },
  qux: {
    type: 'array',
    alias: 'q'
  },
  norf: {
    type: 'boolean',
    alias: 'n'
  }
})
console.dir(args)
```

```
$ node foo-bar-qux.js --foo
{
  foo: true
}

$ node foo-bar-qux.js --bar hey
{
  bar: 'hey'
}

$ node foo-bar-qux.js --qux thing1 thing2 thing3
{
  qux: ['thing1', 'thing2', 'thing3']
}

$ node foo-bar-qux.js -f -b hey -q thing1 thing2 thing3
{
  foo: true,
  bar: 'hey',
  qux: ['thing1', 'thing2', 'thing3']
}

$ node foo-bar-qux.js -fn
{
  foo: true,
  norf: true
}

$ node foo-bar-qux.js not specified
{
  _: ['not', 'specified']
}

$ node foo-bar-qux.js --unknown surprise
{
  unknown: 'surprise'
}
```

If you don't care about aliases or types, you don't actually need to configure anything, `argv-parse` will intelligently guess how the unknown flag should be interpreted:

*simple.js*

```
var argv = require('argv-parse')
var args = argv()
console.dir(args)
```

```
$ node simple.js --unknown
{
  unknown: true
}

$ node simple.js --unknown hey
{
  unknown: 'hey'
}

$ node simple.js --unknown hey you
{
  unknown: ['hey', 'you']
}

$ node simple.js first second --unknown hey you
{
  _: ['first', 'second'],
  unknown: ['hey', 'you']
}
```

## License

[ISC](LICENSE)
