'use strict'

const _isFinite = require('lodash/isFinite')

const processParams = (data) => {
  const params = { ...data }

  if (params._symbol) {
    params.symbol = params._symbol
    delete params._symbol
  }

  if (params.action) {
    if (params.action === 'Sell') {
      params.amount = Math.abs(+params.amount) * -1
    }

    if (params.action === 'Buy') {
      params.amount = Math.abs(+params.amount)
    }
  }

  return params
}

module.exports = processParams
