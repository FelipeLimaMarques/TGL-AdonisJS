'use strict'

const Antl = use('Antl')

class UpdateUser {
  get validateAll () {
    return true
  }

  get rules () {
    const userId = this.ctx.params.id

    return {
      name: 'required|string|alpha',
      email: `required|email|unique:users,email,id,${userId}`,
      password: 'required|string|min:6'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = UpdateUser
