import { FastifyInstance } from "fastify";
import { build } from "../src/app";

describe("The database", () => {
  let app: FastifyInstance;

  beforeAll(() => {
    app = build();
  });

  afterAll(async () => {
    await app.close();
  });

  it("is accessible in the server instance", async (done) => {
    await app.inject({
      method: "GET",
      path: "/",
    });
    expect(app.db).toBeDefined();
    done();
  });
});
