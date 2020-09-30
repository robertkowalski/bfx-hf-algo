'use strict'

const { Order } = require('bfx-api-node-models')
const genCID = require('../../util/gen_client_id')

/**
 * @param {AOInstance} instance - AO instance
 * @returns {object} order
 */
const generateHedgeOrder = (instance = {}) => {
  const { state = {} } = instance
  const { args = {} } = state
  const {
    amount, symbol, orderPrice, hidden, postonly
  } = args

  const lev = 1
  const symbolFuture = getPerpFutureName(symbol)
  const cid = genCID()

  const sharedOrderParams = {
    meta: { _HF: 1 },
    amount: amount * -1,
    lev
  }

console.log(2, sharedOrderParams)

  const o = new Order({
    ...sharedOrderParams,
    price: +orderPrice,
    cid: cid,
    type: 'LIMIT',
    hidden,
    postonly,
    symbol: symbolFuture
  })

  return o
}

function getPerpFutureName (symbol) {
  const base = symbol.substring(1,4)

  return `t${base}F0:USTF0`
}

module.exports = generateHedgeOrder
