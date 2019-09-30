const pssswordStrength = (value) => {
  if (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  ) {
    return 'no_input';
  } else if (typeof value === 'string' && value.trim().length < 8) {
    return 'weak'
  } else {
    return 'strong'
  }
}

export default pssswordStrength;