'use strict'

const unserialize = (loadedState = {}) => {
  const { args = {}, name, label, positions, orders } = loadedState

  return {
    label,
    name,
    args,
    positions,
    orders
  }
}

module.exports = unserialize
