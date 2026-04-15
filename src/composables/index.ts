import {
  HandlePiwikPROReturnedType,
  NuxtAppWithPiwikPRO,
  PiwikPROHandler,
} from "../types";

const handlePiwikPRO = async <T = unknown>(
  nuxtApp: NuxtAppWithPiwikPRO,
  handler: PiwikPROHandler<T>
): HandlePiwikPROReturnedType<T> => {
  if (import.meta.client) {
    const { $piwikPRO } = nuxtApp;
    // This check is needed in case of using `usePiwikPro` without injecting the module itself into Nuxt application in nuxt.config.ts
    if ($piwikPRO) {
      return await handler($piwikPRO);
    }
    console.error(
      "Piwik PRO is not injected to Nuxt App. Pass '@piwikpro/nuxt-piwik-pro' package as a Nuxt module in 'nuxt.config' file."
    );
  } else {
    console.warn(
      "Piwik PRO is a client only library and cannot be used in server side."
    );
  }
  return undefined;
};

export const usePiwikPro = <T = unknown>(
  handler: PiwikPROHandler<T>
): HandlePiwikPROReturnedType<T> => handlePiwikPRO(useNuxtApp(), handler);
