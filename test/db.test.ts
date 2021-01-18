import { FastifyInstance } from "fastify";
import { Repository } from "typeorm";
import { build } from "../src/app";
import { Application } from "../src/entity/Application";

describe("The database", () => {
  let app: FastifyInstance & {
    db?: {
      applications: Repository<Application>;
    };
  };

  beforeAll(() => {
    app = build();
  });

  it.only("is accessible in the server instance", () => {
    expect(app.db).toBeDefined();
  });
});
