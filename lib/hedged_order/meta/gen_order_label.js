'use strict'

const genOrderLabel = (state = {}) => {
  const { args = {} } = state
  const {
    orderType, orderPrice, amount, ocoAmount, limitPrice, stopPrice
  } = args

  return [
    'HedgedOrder',
    ` | ${amount} @ ${orderPrice || orderType} `,
    ' | triggers '
  ].join('')
}

module.exports = genOrderLabel
