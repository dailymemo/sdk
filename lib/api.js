require('isomorphic-fetch');


const buildQuery = (qs = {}) =>
  Object.keys(qs)
    .filter((k) => !!qs[k])
    .map((k) => {
      const key = encodeURIComponent(k)
      const value = encodeURIComponent(qs[k])
      return `${key}=${value}`
    })
    .join('&')

class API {
  constructor({ token, env }) {
    this.token = token
    this.env = env

    this.base = 'https://devapi.giki.app'
    if (env === 'production') {
      this.base = 'https://api.giki.app'
    }
  }

  post(path, body) {
    return fetch(`${this.base}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body,
    })
  }

  get(path, qs = {}) {
    return fetch(`${this.base}${path}?${buildQuery(qs)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    })
  }

  put(path, body) {
    return fetch(`${this.base}${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body,
    })
  }

  delete(path, qs = {}, body) {
    return fetch(`${this.base}${path}?${buildQuery(qs)}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body,
    })
  }
}


let _api = null
const init = (config = {}) => {
  _api = new API(config)
}

const get = () => {
  return _api
}

module.exports = {
  init,
  get
}
