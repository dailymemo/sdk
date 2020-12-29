require('isomorphic-fetch')

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
  constructor({ token = '', env = 'production', base = 'https://giki.app/api' }) {
    this._token = token
    this._env = env
    this._base = base
  }

  _post(path, body = {}) {
    const headers = {
      'Content-Type': 'application/json',
    }

    if (this._token) {
      headers.Authorization = `Bearer ${this._token}`
    }

    return fetch(`${this._base}${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })
  }

  _get(path, qs = {}) {
    const headers = {
      'Content-Type': 'application/json',
    }

    if (this._token) {
      headers.Authorization = `Bearer ${this._token}`
    }

    return fetch(`${this._base}${path}?${buildQuery(qs)}`, {
      method: 'GET',
      headers,
    })
  }

  _put(path, body = {}) {
    const headers = {
      'Content-Type': 'application/json',
    }

    if (this._token) {
      headers.Authorization = `Bearer ${this._token}`
    }

    return fetch(`${this._base}${path}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    })
  }

  _delete(path, qs = {}, body = {}) {
    const headers = {
      'Content-Type': 'application/json',
    }

    if (this._token) {
      headers.Authorization = `Bearer ${this._token}`
    }

    return fetch(`${this._base}${path}?${buildQuery(qs)}`, {
      method: 'DELETE',
      headers,
      body: JSON.stringify(body),
    })
  }

  token(tok = '') {
    this._token = tok
    return this
  }

  env(e = '') {
    this._env = e
    return this
  }

  async login(payload = {}) {
    const { provider } = payload
    if (provider === 'apple') {
      const { email, fullName, identityToken } = payload
      const opt = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          fullName,
          identityToken,
        }),
      }

      return fetch(`${this._base}/user/sign_with_apple`, opt)
    }
    return this._post('/user/login', {})
  }

  save(resourceType, data = {}) {
    switch (resourceType) {
      case 'talks': {
        return this.saveTalk(data)
      }

      case 'users': {
        return this.saveUser(data)
      }
      default:
        throw new Error(`invalid entity type: ${resourceType}`)
    }
  }

  query(resourceType, qs = {}) {
    return this._get(`/${resourceType}`, qs)
  }

  delete(resourceType, qs = {}, data = {}) {
    return this._delete(`/${resourceType}`, qs, data)
  }

  saveTalk(data) {
    const { id } = data
    if (id) {
      return this.updateTalk(data)
    }
    return this.createTalk(data)
  }

  saveUser(data) {
    return this._put('/users', data)
  }

  async createTalk(data = {}) {
    const { text } = data
    if (!text) {
      throw new Error('text should not be empty')
    }
    return this._post('/talks', data)
  }

  updateTalk(data) {
    return this._put('/talks', data)
  }
}

module.exports = API
