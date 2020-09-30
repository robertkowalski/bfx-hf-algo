'use strict'

const _isFinite = require('lodash/isFinite')
const _includes = require('lodash/includes')

const ORDER_TYPES = ['MARKET', 'LIMIT']
const ALLOWED = ['tBTCUSD', 'tETHUSD']


const validateParams = (args = {}) => {
  const {
    amount, orderType, symbol, orderPrice
  } = args
console.log(args)
  if (!_includes(ORDER_TYPES, orderType)) return `Invalid order type: ${orderType}`
  if (!_isFinite(amount)) return 'Invalid amount'

  if (!_isFinite(orderPrice)) {
    return 'Limit price required for LIMIT order type'
  }

  if (!ALLOWED.includes(symbol)) {
    return 'Just tBTCUSD and tBTCUSD Future Hedges are currently possible'
  }

  return null
}

module.exports = validateParams
