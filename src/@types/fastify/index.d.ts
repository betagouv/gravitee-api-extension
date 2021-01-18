import * as fastify from "fastify";
import * as http from "http";
import { Repository } from "typeorm";
import { Application } from "../entity/Application";

declare module "fastify" {
  export interface FastifyInstance<
    HttpServer = http.Server,
    HttpRequest = http.IncomingMessage,
    HttpResponse = http.ServerResponse
  > {
    db: {
      applications: Repository<Application>;
    };
  }
}
