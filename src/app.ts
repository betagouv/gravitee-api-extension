import fastify, { FastifyInstance, FastifyServerOptions } from "fastify";
import { ConnectionOptions, Repository } from "typeorm";
import { Application } from "./entity/Application";
import dbPlugin from "./plugins/db";

type Options = FastifyServerOptions & {
  dbOptions?: ConnectionOptions;
};

export const build = (options: Options = {}) => {
  const app = fastify(options);
  app.register(dbPlugin, options.dbOptions);

  app.get("/ping", async (request, reply) => {
    return "pong\n";
  });

  app.get("/applications", async (request, reply) => {
    return app.db.applications.find();
  });

  return app;
};
