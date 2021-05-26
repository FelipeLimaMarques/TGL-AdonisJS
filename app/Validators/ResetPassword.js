'use strict'

const Antl = use('Antl')

class ResetPassword {
  get validateAll () {
    return true
  }
  
  get rules () {
    return {
      token: 'required|string',
      password: 'required|string'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = ResetPassword
