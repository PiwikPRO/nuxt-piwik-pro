import type { PluginArgs } from "./types";

declare module "nuxt/schema" {
  interface PublicRuntimeConfig
    extends Omit<PluginArgs, "nonce" | "cspNonceBridge"> {
    piwikProCspNonceBridge?: boolean;
  }
}

export {};
