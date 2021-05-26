'use strict'

const User = use('App/Models/User')
const Mail = use('Mail')

class UserController {
    async index ({ response }) {
        try {
            const users = await User.query().with('bets').fetch()
            const obj = { users: users}
    
            return obj
        } catch (err) {
            return response.status(err.status).send({ error: { message: 'Nenhum usuário encontrado.' } })
        }
    }

    async store ({ request, response }) {
        try {
            const data = request.only(['name', 'email', 'password'])

            const user = await User.create(data)

            await Mail.send(
                ['emails.new_user'],
                {
                    name: user.name,
                    email: user.email,
                    password: data.password,
                    token: user.token,
                },
                message => {
                    message
                        .to(user.email)
                        .from('tgl@noreply.com', 'TGL Team')
                        .subject('Usuário cadastrado')
                }
            )

            return user
        } catch (err) {
            return response.status(err.status).send({ error: { message: 'Algo deu errado.' } })
        }
    }

    async show ({ params, response, auth }) {
        try {
            if (auth.user.id !== Number(params.id)) {
                return { error: 'Você não pode ver os dados de outro usuário.' }
            }
            const user = auth.user
        
            await user.load('bets')
        
            return user
        } catch (err) {
          return response.status(err.status).send({ error: { message: 'Este usuário não existe.' } })
        }
      }

    async update ({ params, request, response }) {
        try {
            const user = await User.findOrFail(params.id)
            const data = request.all()

            user.merge(data)
            user.save()

            return user
        } catch (err) {
            return response.status(err.status).send({ error: { message: 'Algo deu errado.' } })
        }
    }

    async destroy ({ params, response }) {
        try {
            const user = await User.findOrFail(params.id)

            user.delete()
        } catch (err) {
            return response.status(err.status).send({ error: { message: 'Este usuário não existe.' } })
        }
    }
}

module.exports = UserController
