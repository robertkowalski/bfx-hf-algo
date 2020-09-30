'use strict'

const defineAlgoOrder = require('../define_algo_order')

const onLifeStart = require('./events/life_start')
const onLifeStop = require('./events/life_stop')
const onSelfSubmitInitialOrder = require('./events/self_submit_initial_order')
const onSelfSubmitHedgeOrder = require('./events/self_submit_hedge_order')
const onOrdersOrderFill = require('./events/orders_order_fill')

const serialize = require('./meta/serialize')
const unserialize = require('./meta/unserialize')
const initState = require('./meta/init_state')
const validateParams = require('./meta/validate_params')
const processParams = require('./meta/process_params')
const genOrderLabel = require('./meta/gen_order_label')
const declareEvents = require('./meta/declare_events')

/*

//
//const onOrdersOrderCancel = require('./events/orders_order_cancel')
const genPreview = require('./meta/gen_preview')
const getUIDef = require('./meta/get_ui_def')


 *   margin: true

*/

const HedgedLimit = defineAlgoOrder({
  id: 'bfx-hedged-order',
  name: 'Hedged Limit Order',

  meta: {
    genOrderLabel,
    validateParams,
    processParams,
    declareEvents,
    //   genPreview,
    initState,
    //   getUIDef,
    serialize,
    unserialize
  },

  events: {
    self: {
      submit_initial_order: onSelfSubmitInitialOrder,
      submit_hedge_order: onSelfSubmitHedgeOrder
    },

    life: {
      start: onLifeStart,
      stop: onLifeStop
    },

    orders: {
      order_fill: onOrdersOrderFill,
      //     order_cancel: onOrdersOrderCancel
    }
  }
})

module.exports = HedgedLimit
