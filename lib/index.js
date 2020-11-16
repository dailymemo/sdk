const initClient = require('./api')
const Talk = require('./talk')

const create = (config = {}) => {
  const { env, token } = config || {}

  initClient({ env, token })

  return { Talk }
}

module.exports = create
