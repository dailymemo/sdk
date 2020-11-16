const API = require('./api')

class Talk {
  constructor({ text, images, tags, local_id, id }) {
    if (!text) {
      throw new Error('text should not be empty')
    }

    this.text = text || ''
    this.images = images || []
    this.tags = tags || []
    this.id = id
    this.local_id = this.local_id
  }

  save() {
    if (this.id) {
      this.update()
    } else {
      this.create()
    }
  }

  delete() {
    return API.get().delete('/talks', this.stringify())
  }

  update() {
    return API.get().put('/talks', this.stringify())
  }

  create() {
    return API.get().post('/talks', this.stringify())
  }

  stringify() {
    return JSON.stringify({
      text: this.text,
      images: this.images,
      tags: this.tags,
      local_id: this.local_id,
      id: this.id,
    })
  }
}

module.exports = Talk
