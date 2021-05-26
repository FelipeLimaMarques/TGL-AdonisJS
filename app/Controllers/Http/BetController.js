'use strict'

const Bet = use('App/Models/Bet')
const Game = use('App/Models/Game')
const Mail = use('Mail')

class BetController {
  async index ({ response, auth }) {
    try {
      const bets = await Bet.query().with('user').with('game').fetch()

      const betsJSON = bets.toJSON()
      const filtered = betsJSON.filter(bet => bet.user_id === auth.user.id)

      return { bets: filtered }
    } catch (err) {
      return response.status(err.status).send({ error: { message: 'Nenhuma aposta foi encontrada.' } })
    }
  }

  verifyAndFormatData (data, user, gamesJSON) {
    const numsArr = data.map(bet => JSON.parse('[' + bet.numbers + ']'))
    numsArr.forEach(arr => {
      arr.sort((a, b) => a - b)
      for(let i = 0; i < arr.length; i++) {
          if (arr.includes(arr[i], i+1)) throw new Error()
      }
    })
    const joined = numsArr.map(arr => arr.join(', '))
    const sorted = data.map((bet, index) => { return {
      ...bet,
      numbers: joined[index],
      price: gamesJSON[bet.game_id - 1].price,
      user_id: user.id } })
    return sorted
  }

  async store ({ request, response, auth }) {
    try {
      const user = auth.user
      const data = request.input('bets')
      const games = await Game.all()
      const gamesJSON = games.toJSON()
      const updated = this.verifyAndFormatData(data, user, gamesJSON)
      
      await Mail.send(
        ['emails.new_bet'],
        { 
          bets: updated,
          games: gamesJSON,
          name: user.name
        },
        message => {
          message
            .to(user.email)
            .from('tgl@noreply.com', 'TGL Team')
            .subject('Nova aposta')
        }
      )

      const bets = await Bet.createMany(updated)
        
      return bets
    } catch (err) {
      if (!err.status) return response.status(401).send({ error: { message: 'Números repetidos não são aceitos.' } })
      return response.status(err.status).send({ error: { message: 'Algo deu errado.' } })
    }
  }

  async show ({ params, response }) {
    try {
      const bet = await Bet.firstOrFail(params.id)

      await bet.load('user')
      await bet.load('game')

      return bet
    } catch (err) {
      return response.status(err.status).send({ error: { message: 'Esta aposta não existe.' } })
    }
  }

  async update ({ params, request, response }) {
    try {
      const bet = await Bet.firstOrFail(params.id)
      const data = request.all()

      bet.merge(data)
      await bet.save()

      return bet
    } catch (err) {
      return response.status(err.status).send({ error: { message: 'Algo deu errado.' } })
    }
  }

  async destroy ({ params, response }) {
    try {
      const bet = await Bet.firstOrFail(params.id)

      bet.delete()
    } catch (err) {
      return response.status(err.status).send({ error: { message: 'Esta aposta não existe.' } })
    }
  }
}

module.exports = BetController
