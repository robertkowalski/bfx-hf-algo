'use strict'

const generateInitialOrder = require('../util/generate_initial_order')

/**
 * Generates and submits the hedge order
 *
 * @param {AOInstance} instance - AO instance
 * @returns {Promise} p - resolves on completion
 */
const onSelfSubmitInitialOrder = async (instance = {}) => {
  const { state = {}, h = {} } = instance
  const { emit, debug } = h
  const { args = {}, gid } = state

  const order = generateInitialOrder(instance)

  debug(
    'generated hedge order %s for %f @ %s',
    order.type, order.amount, order.price || 'MARKET'
  )

  return emit('exec:order:submit:all', gid, [order], 0)
}

module.exports = onSelfSubmitInitialOrder
