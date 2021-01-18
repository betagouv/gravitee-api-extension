import "reflect-metadata"
import fp from "fastify-plugin"
import {ConnectionOptions, createConnection, getConnectionOptions} from "typeorm"
import { Application } from "../entity/Application";

export default fp(async (server, options: ConnectionOptions) => {
    try {
        const connectionOptions = await getConnectionOptions();
        Object.assign(connectionOptions, options, {
            synchronize: false,
            entities: [Application]
        })
        const connection = await createConnection(connectionOptions)

        server.decorate("db", {
            applications: connection.getRepository(Application)
        })
    } catch (error) {
        console.error(error);
    }
})
