'use strict'

class SessionController {
    async store ({ request, response, auth }) {
        try {
            const data = request.all()
            const token = await auth.attempt(data.email, data.password)

            return token
        } catch (err) {
            return response.status(err.status).send({ error: { message: 'Algo deu errado.' } })
        }
    }
}

module.exports = SessionController
