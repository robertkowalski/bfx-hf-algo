'use strict'

const debug = require('debug')('bfx:hf:algo:ao-host:ws2:process-message')

module.exports = async (aoHost, msg = {}) => {
  const { triggerGlobalEvent, triggerOrderEvent, triggerPositionEvent } = aoHost
  const { type, args } = msg

  switch (type) {
    case 'open': {
      debug('process %s', type)

      await aoHost.emit('open')
      break
    }

    case 'auth:success': {
      debug('process %s', type)

      const [packet, meta] = args
      await aoHost.emit('auth:success', packet, meta)
      break
    }

    case 'auth:error': {
      debug('process %s', type)

      const [packet, meta] = args
      await aoHost.emit('auth:error', packet, meta)
      break
    }

    case 'auth:n': {
      debug('process %s', type)

      const [packet, meta] = args
      await aoHost.emit('auth:n', packet, meta)
      break
    }

    case 'order:snapshot': {
      debug('process %s', type)

      const [orders] = args
      await triggerGlobalEvent('orders', 'order_snapshot', orders)
      break
    }

    case 'order:new': {
      const [order] = args
      const { amount, amountOrig, price, status } = order

      debug(
        'process %s [%f/%f @ %f %s]',
        type, amount, amountOrig, price, status
      )

      await triggerOrderEvent('orders', 'order_new', order)

      if (status.match(/PARTIALLY/)) {
        await triggerOrderEvent('orders', 'order_fill', order)
      }

      break
    }

    case 'order:update': {
      const [order] = args
      const { amount, amountOrig, price, status } = order

      debug(
        'process %s [%f/%f @ %f %s]',
        type, amount, amountOrig, price, status
      )

      await triggerOrderEvent('orders', 'order_update', order)

      if (status.match(/PARTIALLY/)) {
        await triggerOrderEvent('orders', 'order_fill', order)
      }

      break
    }

    case 'order:close': {
      const [order] = args
      const { amount, amountOrig, price, status } = order

      debug(
        'process %s [%f/%f @ %f %s]',
        type, amount, amountOrig, price, status
      )

      await triggerOrderEvent('orders', 'order_close', order)

      if (status.match(/CANCELED/)) {
        /**
         * Triggered on atomic order cancellation
         *
         * @event AOHost~ordersOrderCancel
         * @param {object} order - the order that was cancelled
         */
        await triggerOrderEvent('orders', 'order_cancel', order)
      } else {
        /**
         * Triggered on atomic order fill
         *
         * @event AOHost~ordersOrderFill
         * @param {object} order - the order that was filled
         */
        await triggerOrderEvent('orders', 'order_fill', order)
      }

      break
    }

    case 'position:snapshot': {
      const [position] = args

      await triggerPositionEvent('positions', 'position_snapshot', position)
      break
    }

    case 'position:new': {
      const [position] = args

      await triggerPositionEvent('positions', 'position_new', position)
      break
    }

    case 'position:update': {
      const [position] = args

      await triggerPositionEvent('positions', 'position_update', position)
      break
    }

    case 'position:close': {
      const [position] = args

      await triggerPositionEvent('positions', 'position_close', position)
      break
    }

    case 'order:error': {
      const [order] = args

      /**
       * Triggered on a generic order error
       *
       * @event AOHost~ordersOrderError
       * @param {object} order - the order that caused the error
       */
      await triggerOrderEvent('orders', 'order_error', order)
      break
    }

    case 'trades': {
      debug('process %s', type)

      const [trades] = args
      await triggerGlobalEvent('data', 'trades', trades)
      break
    }

    case 'book': {
      debug('process %s', type)

      const [update] = args
      await triggerGlobalEvent('data', 'book', update)
      break
    }

    default: {
      debug('unknown ws event: %s [%j]', type, args)
    }
  }
}
