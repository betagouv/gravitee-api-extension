module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globalSetup: "./tests/setupTests.ts",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json",
    },
  },
  roots: ["src", "tests"],
};
