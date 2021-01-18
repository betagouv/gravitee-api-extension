import * as dotenv from "dotenv";

module.exports = () => {
  dotenv.config({
    path: ".env.test",
  });
};
