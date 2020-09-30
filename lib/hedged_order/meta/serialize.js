'use strict'

const serialize = (state = {}) => {
  const { args = {}, label, name, positions, orders } = state

  return {
    label,
    name,
    args,
    positions,
    orders
  }
}

module.exports = serialize
