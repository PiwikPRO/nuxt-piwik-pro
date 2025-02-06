import { defineNuxtPlugin, useRuntimeConfig } from "nuxt/app";
import PiwikPRO from "@piwikpro/tracking-base-library";
import * as PiwikPROServices from "@piwikpro/vue-piwik-pro";
import { PluginArgs, PiwikPROServicesType } from "../types";
import { VERSION } from "../version";

export default defineNuxtPlugin<{ piwikPRO: PiwikPROServicesType }>({
  name: "piwik-pro",
  setup() {
    try {
      if (import.meta.client) {
        const { public: publicConfig } = useRuntimeConfig();
        const { containerId, containerUrl, ...restOptions } =
          publicConfig as PluginArgs;

        PiwikPROServices.Miscellaneous.setTrackingSourceProvider(
          "nuxt",
          VERSION
        );

        PiwikPRO.initialize(containerId ?? "", containerUrl ?? "", restOptions);
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
