'use strict'

const Antl = use('Antl')

class Game {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      'types': 'required|array|min:1',
      'types.*.type': 'required|string|unique:games,type',
      'types.*.description': 'required|string',
      'types.*.range': 'required|integer|min:0',
      'types.*.price': 'required|number|min:0',
      'types.*.max-number': 'required|integer|min:0',
      'types.*.color': 'required|string',
      'types.*.min-cart-value': 'required|number|min:0'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Game
