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
  constructor(config = {}) {
    const { token, env } = config 
    this._token = token
    this._env = env

    this.base = 'https://devapi.giki.app'
    if (this._env === 'production') {
      this.base = 'https://api.giki.app'
    }
  }

  _post(path, body) {
    return fetch(`${this.base}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}`,
      },
      body,
    })
  }

  _get(path, qs = {}) {
    return fetch(`${this.base}${path}?${buildQuery(qs)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}`,
      },
    })
  }

  _put(path, body) {
    return fetch(`${this.base}${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}`,
      },
      body,
    })
  }

  _delete(path, qs = {}, body) {
    return fetch(`${this.base}${path}?${buildQuery(qs)}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this._token}`,
      },
      body,
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

  async login() {
    return this._post('/user/login')
  }

  save(entityType, data = {}) {
    switch (entityType) {
      case 'talk': {
        return this.saveTalk(data)
      }
      default:
        throw new Error(`invalid entity type: ${entityType}`)
    }
  }

  delete(entityType, data = {}) {
    switch (entityType) {
      case 'talk': {
        return this.deleteTalk(data)
      }
      default:
        throw new Error(`invalid entity type: ${entityType}`)
    }
  }

  saveTalk(data) {
    const { id } = data
    if (this.id) {
      return this.update(data)
    } else {
      return this.create(data)
    }
  }

  async create(data = {}) {
    const { text } = data
    if (!text) {
      throw new Error('text should not be empty')
    }
    return this._post('/talks', JSON.stringify(data))
  }

  delete(data = {}) {
    return this._delete('/talks', JSON.stringify(data))
  }

  update() {
    return this._put('/talks', JSON.stringify(data))
  }
}

module.exports = API
