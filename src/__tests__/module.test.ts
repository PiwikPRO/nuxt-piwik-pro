import { describe, it, expect, beforeEach, vi } from "vitest";

const { addPlugin, warn } = vi.hoisted(() => ({
  addPlugin: vi.fn(),
  warn: vi.fn(),
}));

vi.mock("nuxt/kit", () => ({
  defineNuxtModule: (def: unknown) => def,
  addPlugin,
  useLogger: () => ({ warn }),
}));

import piwikProModule from "../module";

type PiwikModule = {
  setup: (options: Record<string, unknown>, nuxt: unknown) => void;
};

const { setup } = piwikProModule as unknown as PiwikModule;

const makeNuxt = () => ({ options: { runtimeConfig: { public: {} } } });
const validOptions = {
  containerId: "id",
  containerUrl: "https://example.piwik.pro",
};

beforeEach(() => vi.clearAllMocks());

describe("Nuxt module setup", () => {
  it("throws when containerId or containerUrl is missing", () => {
    expect(() => setup({ containerId: "id" }, makeNuxt())).toThrow(
      /'containerUrl' and 'containerId'/
    );
    expect(() =>
      setup({ containerUrl: "https://example.piwik.pro" }, makeNuxt())
    ).toThrow(/'containerUrl' and 'containerId'/);
  });

  it("makes the container settings available to the app, and turns on the CSP nonce bridge when it is enabled", () => {
    const nuxt = makeNuxt();
    setup({ ...validOptions, cspNonceBridge: true }, nuxt);

    expect(nuxt.options.runtimeConfig.public).toMatchObject({
      containerId: "id",
      containerUrl: "https://example.piwik.pro",
      piwikProCspNonceBridge: true,
    });

    expect(nuxt.options.runtimeConfig.public).not.toHaveProperty(
      "cspNonceBridge"
    );
  });

  it("installs the browser-only tracking plugin by default", () => {
    setup({ ...validOptions }, makeNuxt());
    expect(addPlugin).toHaveBeenCalledTimes(1);
    expect(addPlugin).toHaveBeenCalledWith(
      expect.objectContaining({ mode: "client", name: "piwik-pro" })
    );
  });

  it("installs an extra plugin to forward the CSP nonce when the CSP nonce bridge is enabled", () => {
    setup({ ...validOptions, cspNonceBridge: true }, makeNuxt());
    expect(addPlugin).toHaveBeenCalledTimes(2);
    expect(addPlugin).toHaveBeenCalledWith(
      expect.objectContaining({ name: "piwik-pro-nonce-bridge" })
    );
    expect(addPlugin).toHaveBeenCalledWith(
      expect.objectContaining({ mode: "client", name: "piwik-pro" })
    );
  });

  it("warns when a fixed nonce is hardcoded, because it is unsafe for CSP", () => {
    setup({ ...validOptions, nonce: "static-nonce" }, makeNuxt());
    expect(warn).toHaveBeenCalled();
  });
});
