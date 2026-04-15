import type { InitOptions } from "@piwikpro/vue-piwik-pro";
import { defineNuxtPlugin, useRuntimeConfig, useState } from "nuxt/app";
import PiwikPRO from "@piwikpro/tracking-base-library";
import * as PiwikPROServices from "@piwikpro/vue-piwik-pro";
import { PIWIK_PRO_NONCE_STATE_KEY } from "../constants";
import { PluginArgs, PiwikPROServicesType } from "../types";
import { VERSION } from "../version";

type PublicPiwikConfig = Omit<PluginArgs, "cspNonceBridge"> & {
  piwikProCspNonceBridge?: boolean;
};

export default defineNuxtPlugin<{ piwikPRO: PiwikPROServicesType }>({
  name: "piwik-pro",
  setup() {
    try {
      if (import.meta.client) {
        const { public: publicConfig } = useRuntimeConfig();
        const {
          containerId,
          containerUrl,
          piwikProCspNonceBridge,
          ...restOptions
        } = publicConfig as PublicPiwikConfig;

        let initOptions: InitOptions = { ...restOptions };
        if (piwikProCspNonceBridge) {
          const bridged = useState<string>(PIWIK_PRO_NONCE_STATE_KEY).value;
          if (bridged) {
            initOptions = { ...restOptions, nonce: bridged };
          }
        }

        PiwikPROServices.Miscellaneous.setTrackingSourceProvider(
          "nuxt",
          VERSION
        );

        PiwikPRO.initialize(containerId ?? "", containerUrl ?? "", initOptions);
      }
    } catch (err) {
      console.error(err);
    }

    return {
      provide: {
        piwikPRO: PiwikPROServices,
      },
    };
  },
});
