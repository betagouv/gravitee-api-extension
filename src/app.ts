import fastify from 'fastify'

export const build = (options = {}) => {
    const app = fastify(options)

    app.get('/ping', async (request, reply) => {
        return 'pong\n'
    })

    return app
}
