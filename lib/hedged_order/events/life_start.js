'use strict'

const _debounce = require('lodash/debounce')

/**
 * @param {AOInstance} instance - AO instance
 * @returns {Promise} p - resolves on completion
 */
const onLifeStart = async (instance = {}) => {
  const { h = {} } = instance
  const { emitSelf } = h

  return emitSelf('submit_initial_order')
}

module.exports = onLifeStart
