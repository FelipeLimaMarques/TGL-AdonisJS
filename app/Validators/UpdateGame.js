'use strict'

const Antl = use('Antl')

class UpdateGame {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      type: 'required|string',
      description: 'required|string',
      range: 'required|integer|min:0',
      price: 'required|number|min:0',
      'max-number': 'required|integer|min:0',
      color: 'required|string',
      'min-cart-value': 'required|number|min:0'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = UpdateGame
