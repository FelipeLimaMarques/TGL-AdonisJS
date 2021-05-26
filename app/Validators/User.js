'use strict'

const Antl = use('Antl')

class User {
  get validateAll () {
    return true
  }

  get rules () {

    return {
      name: 'required|string|alpha',
      email: 'required|email|unique:users,email',
      password: 'required|string|min:6'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = User
