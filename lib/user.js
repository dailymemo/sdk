const API = require('./api')

class User {
  login() {
    return API.get().post('/user/login')
  }
}

module.exports = User
