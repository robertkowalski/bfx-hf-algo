'use strict'

module.exports = (instance = {}, host) => {
  const { h = {} } = instance
  const { declareEvent } = h

  declareEvent(instance, host, 'self:submit_initial_order', 'submit_initial_order')
  declareEvent(instance, host, 'self:submit_hedge_order', 'submit_hedge_order')
}
