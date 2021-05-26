'use strict'

const Antl = use('Antl')

class Bet {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      'bets': 'required|array|min:1',
      'bets.*.numbers': 'required|string',
      'bets.*.game_id': 'required|integer'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Bet
