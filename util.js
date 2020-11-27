const ensure = (condition, msg, code = 1) => {
  condition || abort(msg, code)
}

const abort = (msg, code = 1) => {
  console.error(msg)
  process.exit(code)
}

const parseValue = (value) => {
  if (!isNaN(value)) return Number(value)
  if (value === 'true') return true
  if (value === 'false') return false
  return value
}

module.exports = { ensure, abort, parseValue }
