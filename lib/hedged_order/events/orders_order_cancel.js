'use strict'

const onOrdersOrderCancel = async (instance = {}, order) => {
  const { state = {}, h = {} } = instance
  const { args = {}, orders = {}, gid } = state
  const { emit, debug } = h
  const { cancelDelay } = args

  debug('detected cancelation, stopping...')

  await emit('exec:order:cancel:all', gid, orders, cancelDelay)
  return emit('exec:stop')
}

module.exports = onOrdersOrderCancel
