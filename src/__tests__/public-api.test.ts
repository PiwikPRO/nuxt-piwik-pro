import { describe, it, expect } from "vitest";
import * as NuxtPiwikPro from "../index";
import { usePiwikPro } from "../composables";

// Services are re-exported from vue-piwik-pro (which re-exports core).
const EXPECTED_SERVICES = [
  "PageViews",
  "CustomEvent",
  "ContentTracking",
  "CookieManagement",
  "CustomDimensions",
  "DownloadAndOutlink",
  "eCommerce",
  "GoalConversions",
  "SiteSearch",
  "UserManagement",
  "DataLayer",
  "ErrorTracking",
  "CrossDomainTracking",
  "ClientConfiguration",
  "Heartbeat",
  "Miscellaneous",
] as const;

describe("public surface of @piwikpro/nuxt-piwik-pro", () => {
  it.each(EXPECTED_SERVICES)('re-exports the "%s" service', (name) => {
    expect(NuxtPiwikPro[name]).toBeDefined();
  });

  it("exposes the PiwikPRO namespace and the Nuxt module as default export", () => {
    expect(NuxtPiwikPro.PiwikPRO).toBeDefined();
    expect(NuxtPiwikPro.default).toBeDefined();
  });

  it("exposes the usePiwikPro composable", () => {
    expect(typeof usePiwikPro).toBe("function");
  });
});
