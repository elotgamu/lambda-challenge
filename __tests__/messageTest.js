const { TestScheduler } = require("jest");
const message = require("../src/message");

describe("Test hello message", () => {
  test("Test hello message respond with 200", () => {
    const response = message.handler();
    expect(response.statusCode).toBe(200);
  });
});
