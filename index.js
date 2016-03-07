function getFlagLocations (args) {
  return args.map(function (arg, i) {
    return arg.charAt(0) === '-' ? i : false
  })
  .filter(function (arg) {
    return arg !== false
  })
}

function processValues (type, values) {
  if (type === 'string') {
    return {
      value: values.shift(),
      _: values
    }
  }
  if (type === 'boolean') {
    return {
      value: true,
      _: values
    }
  }
  if (type === 'array') {
    return {
      value: values,
      _: []
    }
  }
}

function getType (grouped) {
  if (grouped.length === 0) {
    return 'boolean'
  }
  if (grouped.length === 1) {
    return 'string'
  }
  if (grouped.length > 1) {
    return 'array'
  }
}

function findAlias (flags, flag) {
  var alias = Object.keys(flags).filter(function (key) {
    return flag === flags[key].alias
  })
  return alias[0] || false
}

module.exports = function parseArgs (flags, args) {
  args = args || process.argv.slice(2)
  var parsed = {}
  var flagLocations = getFlagLocations(args)

  // add initial unflagged arguments to _
  var _ = args.slice(0, flagLocations[0])

  // if there are no flags, just return _
  if (flagLocations.length === 0) {
    return {_: _}
  }

  flagLocations.forEach(function (flagIndex, i, arr) {
    // get the flag and the values following that flag
    var values = args.slice(flagIndex, flagLocations[i + 1] || args.length)
    var flag = values.length !== 0 ? values.shift() : args[flagIndex]
    var added = false

    if (flag.substring(0, 2) === '--') {
      flag = flag.slice(2)
    }

    if (flag.charAt(0) === '-') {
      flag = flag.slice(1)

      // if it's longer than one letter, assume they are grouped booleans
      if (flag.length > 1) {
        flag.split('').forEach(function (letter) {
          var f = findAlias(flags, letter) || letter
          parsed[f] = true
        })
        _ = _.concat(values)
        added = true
      }

      // look up aliases and use actual name instead
      flag = findAlias(flags, flag)
    }

    // check if we already added it (for grouped booleans)
    if (!added) {
      // if we know the type, use that, otherwise guess
      var entry = flags[flag] || {}
      var type = entry.type || getType(values)
      var processedFlag = processValues(type, values)
      parsed[flag] = processedFlag.value

      // unused values go into the _ array
      _ = _.concat(processedFlag._)
    }
  })

  if (args && flagLocations.length === 0) {
    _ = _.concat(args)
  }

  if (_.length > 0) {
    parsed._ = _
  }

  return parsed
}
