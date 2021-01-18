import { FastifyInstance } from "fastify";
import { build } from "../src/app";

describe("The database", () => {
  let app: FastifyInstance;

  beforeAll(() => {
    app = build();
  });

  it.only("is accessible in the server instance", async () => {
    await app.inject({
      method: "GET",
      path: "/",
    });
    expect(app.db).toBeDefined();
  });
});
