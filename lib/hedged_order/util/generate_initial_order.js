'use strict'

const { Order } = require('bfx-api-node-models')
const genCID = require('../../util/gen_client_id')

const generateInitialOrder = (instance = {}) => {
  const { state = {} } = instance
  const { args = {} } = state
  const {
    amount, symbol, orderType, orderPrice, hidden, postonly, lev
  } = args


  const sharedOrderParams = {
    symbol,
    amount,
    hidden,
    postonly
  }

  console.log(1, sharedOrderParams)

  return new Order({
    ...sharedOrderParams,
    price: +orderPrice,
    cid: genCID(),
    type: orderType,
    meta: { _HF: 1 }
  })

}

module.exports = generateInitialOrder
