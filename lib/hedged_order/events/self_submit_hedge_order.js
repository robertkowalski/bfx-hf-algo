'use strict'

const generateHedgeOrder = require('../util/generate_hedge_order')

/**
 * Generates and submits the initial atomic order as configured within the
 * execution parameters.
 *
 * @param {AOInstance} instance - AO instance
 * @returns {Promise} p - resolves on completion
 */
const onSelfSubmitHedgeOrder = async (instance = {}) => {
  const { state = {}, h = {} } = instance
  const { emit, debug } = h
  const { args = {}, gid } = state

  const order = generateHedgeOrder(instance)

  debug(
    'generated order %s for %f @ %s',
    order.type, order.amount, order.price || 'MARKET'
  )

  return emit('exec:order:submit:all', gid, [order], 0)
}

module.exports = onSelfSubmitHedgeOrder
