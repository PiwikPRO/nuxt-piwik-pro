import type { PluginArgs } from "./types";

declare module "nuxt/schema" {
  interface PublicRuntimeConfig extends Omit<PluginArgs, "cspNonceBridge"> {
    piwikProCspNonceBridge?: boolean;
  }
}

export {};
