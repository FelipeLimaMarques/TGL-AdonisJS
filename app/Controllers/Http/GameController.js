'use strict'

const Game = use('App/Models/Game')

class GameController {
  async index ({ response }) {
    try {
      const games = await Game.query().with('bets').fetch()

      return { types: games }
    } catch (err) {
      return response.status(err.status).send({ error: { message: 'Nenhum jogo encontrado.' } })
    }
  }

  async store ({ request, response }) {
    try {
      const data = request.input('types')
      const games = await Game.createMany(data)

      return games
    } catch (err) {
      return response.status(err.status).send({ error: { message: 'Algo deu errado.' } })
    }
  }

  async show ({ params, response }) {
    try {
      const game = await Game.findOrFail(params.id)

      await game.load('bets')

      return game
    } catch (err) {
      return response.status(err.status).send({ error: { message: 'Este jogo não existe.' } })
    }
  }

  async update ({ params, request, response }) {
    try {
      const game = await Game.findOrFail(params.id)
      const data = request.all()

      game.merge(data)
      game.save()

      return game
    } catch (err) {
      return response.status(err.status).send({ error: { message: 'Algo deu errado.' } })
    }
  }

  async destroy ({ params, response }) {
    try {
      const game = await Game.findOrFail(params.id)

      game.delete()
    } catch (err) {
      return response.status(err.status).send({ error: { message: 'Este jogo não existe.' } })
    }
  }
}

module.exports = GameController
