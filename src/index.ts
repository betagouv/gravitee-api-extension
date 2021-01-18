import { build } from "./app";
import * as dotenv from "dotenv";

const server = build();

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
