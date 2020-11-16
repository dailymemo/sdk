const API = require('./api')
const Talk = require('./talk')

const create = (config = {}) => {
  const { env, token } = config || {}

  API.init({ env, token })

  return { Talk }
}

module.exports = create
