module.exports = function (flags, args) {
  args = args || process.argv.slice(2)

  var parsed = {}
  var _ = []

  var flagLocations = args.map(function (arg, i) {
    return arg.charAt(0) === '-' ? i : false
  })
  .filter(function (arg) {
    return arg !== false
  })

  flagLocations.forEach(function (flagIndex, i, arr) {
    // an array with the flag and all following args
    var grouped = args.slice(flagIndex, flagLocations[i + 1] || args.length)
    var flag = grouped.length !== 0 ? grouped.shift() : args[flagIndex]

    // remove leading hyphens
    if (flag.substring(0, 2) === '--') {
      flag = flag.slice(2)

      // it's on the whitelist, make sure to deal with type!
      if (flags[flag]) {
        var type = flags[flag].type || 'array'
        if (type === 'string') {
          parsed[flag] = grouped.shift()
          _ = _.concat(grouped)
        }
        if (type === 'boolean') {
          parsed[flag] = true
          _ = _.concat(grouped)
        }
        if (type === 'array') {
          parsed[flag] = grouped
        }
      } else {
        // you didn't specify options, you get an array...
        parsed[flag] = grouped
      }
    }

    // check aliases now
    if (flag.charAt(0) === '-') {
      flag = flag.slice(1)
      var entry = Object.keys(flags).find(function (key) {
        return flag === flags[key].alias
      })
      if (entry) {
        type = flags[entry].type || 'array'
        if (type === 'string') {
          parsed[entry] = grouped.shift()
          _ = _.concat(grouped)
        }
        if (type === 'boolean') {
          parsed[entry] = true
          _ = _.concat(grouped)
        }
        if (type === 'array') {
          parsed[entry] = grouped
        }
      } else {
        parsed[flag] = grouped
      }
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
