import { FastifyInstance } from "fastify";
import { build } from "../src/app";

describe("Server", () => {
  let app: FastifyInstance;

  beforeAll(() => {
    app = build();
  });

  afterAll(async () => {
    await app.close();
  });

  it("responds to /ping", async (done) => {
    const response = await app.inject({
      method: "GET",
      url: "/ping",
    });

    expect(response.statusCode).toBe(200);
    expect(response.payload).toBe("pong\n");
    done();
  });

  it("lists the application ids", async (done) => {
    const emptyResponse = await app.inject({
      method: "GET",
      url: "/applications",
    });

    expect(emptyResponse.statusCode).toBe(200);
    expect(JSON.parse(emptyResponse.body)).toEqual([]);

    await app.db.applications.insert({
      id: "yolo",
    });

    const listResponse = await app.inject({
      method: "GET",
      url: "/applications",
    });

    expect(listResponse.statusCode).toBe(200);
    expect(JSON.parse(listResponse.body)).toEqual([
      {
        id: "yolo",
      },
    ]);
    done();
  });
});
