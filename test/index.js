var argv = require('../')
var test = require('tape')

test('Should parse booleans', function (t) {
  t.plan(1)
  var args = argv({
    flag: {
      type: 'boolean'
    }
  }, ['--flag'])
  t.deepLooseEqual(args, {
    flag: true
  })
})

test('Should parse strings', function (t) {
  t.plan(1)
  var args = argv({
    flag: {
      type: 'string'
    }
  }, ['--flag', 'banana'])
  t.deepLooseEqual(args, {
    flag: 'banana'
  })
})

test('Should parse arrays', function (t) {
  t.plan(1)
  var args = argv({
    flag: {
      type: 'array'
    }
  }, ['--flag', 'thing', 'thing2'])
  t.deepLooseEqual(args, {
    flag: ['thing', 'thing2']
  })
})

test('Should collect extra arguments as _', function (t) {
  t.plan(1)
  var args = argv({
    flag: {
      type: 'string',
      alias: 'f'
    }
  }, ['-f', 'thing', 'extra'])
  t.deepLooseEqual(args, {
    flag: 'thing',
    _: ['extra']
  })
})

test('Should collect extra arguments as _ even without any flags', function (t) {
  t.plan(1)
  var args = argv({}, ['thing', 'extra'])
  t.deepLooseEqual(args, {
    _: ['thing', 'extra']
  })
})

test('Should use alias', function (t) {
  t.plan(1)
  var args = argv({
    flag: {
      type: 'string',
      alias: 'f'
    }
  }, ['-f', 'thing'])
  t.deepLooseEqual(args, {
    flag: 'thing'
  })
})

test('Should parse grouped aliases', function (t) {
  t.plan(1)
  var args = argv({
    flag: {
      type: 'boolean',
      alias: 'f'
    },
    like: {
      type: 'boolean',
      alias: 'l'
    }
  }, ['-fl'])
  t.deepLooseEqual(args, {
    flag: true,
    like: true
  })
})
