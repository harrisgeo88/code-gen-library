function isNotEmpty(input) {
  let res = true
  if (!input || input === '') {
    res = 'Please provide a name'
  }
  if (input.length < 2) {
    res = 'Please provide a longer name'
  }
  return res
}

module.exports = {
  isNotEmpty,
}
