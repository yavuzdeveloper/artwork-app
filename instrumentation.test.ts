import * as sentryModule from "./instrumentation";

describe("Sentry register function", () => {
  afterEach(() => {
    delete process.env.NEXT_RUNTIME;
    jest.resetModules();
  });

  it("should be callable without error", async () => {
    await expect(sentryModule.register()).resolves.not.toThrow();
  });

  it("should handle NEXT_RUNTIME=nodejs without throwing", async () => {
    process.env.NEXT_RUNTIME = "nodejs";
    await expect(sentryModule.register()).resolves.not.toThrow();
  });

  it("should handle NEXT_RUNTIME=edge without throwing", async () => {
    process.env.NEXT_RUNTIME = "edge";
    await expect(sentryModule.register()).resolves.not.toThrow();
  });
});

describe("Sentry onRequestError export", () => {
  it("should export captureRequestError from Sentry", () => {
    expect(typeof sentryModule.onRequestError).toBe("function");
  });
});
