const create = require('./sdk')
const API = require('./api')

describe('SDK', () => {
  it('API', () => {
    let api = API.get()
    expect(api).toBe(null)
    const env = 'staging'
    const token = 'test-token'
    create({ env, token })
    api = API.get()
    expect(api).not.toBeNull()
    expect(api.token).toEqual(token)
    expect(api.env).toEqual(env)
  })
})
