import type { InitOptions } from "@piwikpro/vue-piwik-pro";
import type * as PiwikPROServices from "@piwikpro/vue-piwik-pro";
import type { NuxtApp } from "nuxt/schema";

export type PluginArgs = {
  containerId: string;
  containerUrl: string;
  cspNonceBridge?: boolean;
} & InitOptions;

export type PiwikPROServicesType = typeof PiwikPROServices;
export type NuxtAppWithPiwikPRO = NuxtApp & { $piwikPRO: PiwikPROServicesType };
export type PiwikPROHandler<T = unknown> = (
  piwikPRO: PiwikPROServicesType
) => T | Promise<T>;
export type HandlePiwikPROReturnedType<T = unknown> = Promise<T | undefined>;
