import fastify, { FastifyServerOptions } from 'fastify'
import { ConnectionOptions } from 'typeorm';
import dbPlugin from './plugins/db';

type Options = FastifyServerOptions & {
    dbOptions?: ConnectionOptions
}

export const build = (options: Options = {}) => {
    const app = fastify(options)
    app.register(dbPlugin, options.dbOptions);

    app.get('/ping', async (request, reply) => {
        return 'pong\n'
    })

    return app
}
